/*
 * TSLSimulator.c
 *
 * Simple UART TSL 1128 Bluetooth RFID Simulator 
 *
 * Author: Darren Mistica
 * Created: 1/25/2015 3:14:10 PM
 *
 */ 

#define BAUD_PRESCALE 103
#define F_CPU 16000000UL	// Onboard Clock

#include <stdlib.h>
#include <avr/io.h>
#include <string.h>
#include <util/delay.h>

void init();
void usart_send(uint8_t data);
void printu(char string[], uint8_t length);
void usart_init(uint16_t baudin, uint32_t clk_speedin);
void printRead();
void printNoRead();

int main(void)
{
	init();
	
    while(1)
    {
		if(!(PINB & (1<<0)))
		{
			printRead();
			_delay_ms(200);
		}
		
		if(!(PINB & (1<<1)))
		{
			printNoRead();
			_delay_ms(200);
		}
    }
	
	return 0;
}

void init()
{
	usart_init(9600, 16000000);	// baud rate is 9600
	DDRB = 0x00;				// want PB0/B1 to be inputs
	PORTB |= (1<<0);				// Resistor Pull-up on PB0
	PORTB |= (1<<1);				// Resistor Pull-up on PB1
}

void usart_init(uint16_t baudin, uint32_t clk_speedin)
{
	uint32_t ubrr = (clk_speedin/16UL)/baudin-1;
	UBRR0H = (unsigned char)(ubrr>>8);
	UBRR0L = (unsigned char)ubrr;
	/* Enable receiver and transmitter */
	UCSR0B = (1<<RXEN0)|(1<<TXEN0);
	/* Set frame format: 8data, 1stop bit */
	UCSR0C = (0<<USBS0)|(3<<UCSZ00);
	UCSR0A &= ~(1<<U2X0);
}

void usart_send(uint8_t data)
{
	/* Wait for empty transmit buffer */
	while ( !( UCSR0A & (1<<UDRE0)) );
	/* Put data into buffer, sends the data */
	UDR0 = data;
}

void printu(char string[], uint8_t length)	// Perhaps by not using the String library we save memory....?
{
	int index;
	
	for (index = 0; index < length; index++)
	{
		usart_send(string[index]);
	}
}

void printRead()
{
	char read[] = {'C', 'S', ':', ' ', '.', 'i', 'v','\n','\r',
				   'E', 'P', ':', ' ', 'E', '2', '0', '0', '1', '9', 'C', '6', 
				   '0', '9', '1', '9', '3', '1', '7', '1', '1', '3', '5', 'D',
				   '6', '4', 'C', '4', '\n','\r',
				   'E', 'P', ':', ' ', 'E', '2', '0', '0', '3', '2', '6', 'A',
				   '7', '0', '9', '2', '0', 'F', 'B', '1', '1', '1', '6', '9',
				   '3', '8', '3', 'E', '\n', '\r',
				   'O', 'K', ':', '\n', '\r', '\n', '\r'};
				   
	printu(read, 76);
}

void printNoRead()
{
	char noRead[] = {'C', 'S', ':', ' ', '.', 'i', 'v','\n','\r',
					 'M', 'E', ':', ' ', 'N', 'o', ' ', 'T', 'r', 'a', 'n', 's',
					 'p', 'o', 'n', 'd', 'e', 'r', ' ', 'f', 'o', 'u', 'n', 'd',
					 '\n', '\r',
					 'E', 'R', ':', '0', '0', '5', '\n', '\r', '\n', '\r'};
		
	printu(noRead, 45);
}