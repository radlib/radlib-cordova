/**
 * THRONE - BluetoothSoftI2CTemp.c
 *
 * Version: 06.18.2014.2116
 * Author: Darren Mistica
 */ 

#define F_CPU 16000000
#define SDA_PIN 0
#define SDA_PORT PORTC
#define SCL_PIN 1
#define SCL_PORT PORTC

#include <avr/io.h>
#include <avr/interrupt.h>
#include <stdio.h>
#include <string.h>
#include <util/delay.h>
#include "SoftI2CMaster.h"

#define BAUD_PRESCALE 103

void init();
void usart_init(uint16_t baudin, uint32_t clk_speedin);
void usart_send(uint8_t data);
void printu(char string[], uint8_t length);
uint8_t usart_recv(void);
uint8_t usart_istheredata(void);
void printTemp();

volatile char g_ReceivedByte; // Global variable for the byte received from Bluetooth

int main(void)
{
	init();
	
	// it should be noted that the RX pin is triggering an interrupt
	// nothing happens otherwise
	
    while(1)
    {
		if (g_ReceivedByte == 0x54)	// If UART rx data is an 'T'
		{
			printTemp();			// Print temp to UART
			g_ReceivedByte = 0x00;	// Reset global variable
		}
    }
}

void init()
{
	char test[] = {'R','e','a','d','y',' ','t','o',' ','r','o','c','k','!','\n','\r'};
	usart_init(9600, 16000000);	// baud rate is 9600
	i2c_init();
	DDRD = 0x00;				// want PD2 to be input
	PORTD = (1<<2);				// Resistor Pull-up on PD2
	UCSR0B |= (1 << RXCIE0);	// Enable interrupt on USART rx complete
	g_ReceivedByte = 0x00;
	sei();
	printu(test, 16);
}

void usart_init(uint16_t baudin, uint32_t clk_speedin)
{
	uint32_t ubrr = (clk_speedin/16UL) / baudin-1;
	UBRR0H = (unsigned char)(ubrr>>8);
	UBRR0L = (unsigned char)ubrr;
	UCSR0B = (1<<RXEN0)		// Enable receiver
			|(1<<TXEN0);	// Enable transmitter
	UCSR0C = (0<<USBS0)		// See * below
			|(3<<UCSZ00);	// See * below
	UCSR0A &= ~(1<<U2X0);	// *Set frame format: 8data, 1stop bit
}

void usart_send( uint8_t data )
{
	while (!( UCSR0A & (1<<UDRE0)));	// Wait until transmit buffer is clear
	UDR0 = data;						// Send the data
}

void printu(char string[], uint8_t length)
{
	int index;
	
	for (index = 0; index < length; index++)
	{
		usart_send(string[index]);
	}
}

uint8_t usart_recv(void)
{
	while (!(UCSR0A & (1<<RXC0)));	// Wait FOREVER until data is received
	return UDR0;					// Return data from buffer
}

uint8_t usart_istheredata(void)		// Use this function to avoid the usart_recv wait
{
	return (UCSR0A & (1<<RXC0));	// True if data is ready to be read
}

void printTemp()
{
	int dev = 0xB4; // 0x5A<<1, "SA_W" page 17 of datasheet
	int data_low = 0;
	int data_high = 0;
	
	i2c_start(dev + I2C_WRITE);
	i2c_write(0x07);
	
	// read
	i2c_rep_start(dev + I2C_READ);
	data_low = i2c_read(0);	//Read 1 byte and then send ack
	data_high = i2c_read(0);	//Read 1 byte and then send ack
	i2c_read(1);				// not used
	i2c_stop();
	
	//This converts high and low bytes together and processes temperature, MSB is a error bit and is ignored for temps
	double tempFactor = 0.02; // 0.02 degrees per LSB (measurement resolution of the MLX90614)
	double tempData = 0x0000; // zero out the data
	
	// This masks off the error bit of the high byte, then moves it left 8 bits and adds the low byte.
	tempData = (double)(((data_high & 0x007F) << 8) + data_low);
	tempData = (tempData * tempFactor)-0.01;
	
	float celcius = tempData - 273.15;
	float fahrenheit = (celcius*1.8) + 32;

	int int_number = celcius * 100.0;	// Two digits after decimal are kept. Turn the number into integer
	char digits[5];						// Accounts for 3 digits before decimal point
	
	for (int i = 0; i < 5; i++)
	{
		digits[i] = int_number % 10;
		
		if (int_number == 0)
		{
			break;
		}
		
		int_number /= 10;
	}


	char lineEnd[] = {'\n','\r'};
	char celciusC[] = {'C','e','l','c','i','u','s',':',' '};
	printu(lineEnd, 2);
	printu(celciusC, 9);
	usart_send(digits[3] + 48);
	usart_send(digits[2] + 48);
	usart_send('.');
	usart_send(digits[1] + 48);
	usart_send(digits[0] + 48);
	printu(lineEnd, 2);

	int_number = fahrenheit * 100.0; // Two digits after decimal are kept. Turn the number into integer
	
	for (int i = 0; i < 5; i++)
	{
		digits[i] = int_number % 10;
		
		if (int_number == 0)
		{
			break;
		}
		
		int_number /= 10;
	}

	char fahrenheitC[] = {'F','a','h','r','e','n','h','e','i','t',':',' '};
	printu(fahrenheitC, 12);
	
	if (digits[4] != 0)
	{
		usart_send(digits[4] + 48);
	}
	
	usart_send(digits[3] + 48);
	usart_send(digits[2] + 48);
	usart_send('.');
	usart_send(digits[1] + 48);
	usart_send(digits[0] + 48);
	printu(lineEnd, 2);
	
	_delay_ms(1000); // wait a second before printing again
}

ISR(USART_RX_vect)	// When there is data received trigger an interrupt
{
	g_ReceivedByte = UDR0;	// Global variable holding the data read
	UDR0 = g_ReceivedByte;	// Output the received data (echo)
}