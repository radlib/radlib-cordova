#include <SPI.h>
#include <MFRC522.h>

#define SS_PIN 10
#define RST_PIN 9
MFRC522 mfrc522(SS_PIN, RST_PIN);  // Create MFRC522 instance.

void setup()
{
	Serial.begin(9600);	  // 9600 COM Baud Rate
	SPI.begin();		  // Init Hardwar SPI
	mfrc522.PCD_Init();	  // Init MFRC522 card
	Serial.println("Scanning for Proximity Integrated Circuit Cards to see UID and type...");
}

void loop() // Arduino IDE's way of abstracting main
{
	mfrc522.PICC_IsNewCardPresent();
	mfrc522.PICC_ReadCardSerial();
	mfrc522.PICC_DumpToSerial(&(mfrc522.uid));
        mfrc522.PICC_DumpMifareUltralightToSerial();
}
