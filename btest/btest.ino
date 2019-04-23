#include "SparkFunLIS3DH.h"
#include "Wire.h"
#include "SPI.h"

//Create two instances of the driver class
LIS3DH SensorOne( I2C_MODE, 0x18 );
LIS3DH SensorTwo( I2C_MODE, 0x19 );

const int Pot1Pin = A1;
const int Pot2Pin = A0;

int sensor1ZValue =0;
int sensor2ZValue =0;


int sensor1YValue =0;
int sensor2YValue =0;
  
  int bend1 = 0;
  int bend2 = 0;
  float rot1 =0;
  float rot2=0;


void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  delay(100);
  SensorOne.begin();
  SensorTwo.begin();
}

void loop() {
  // put your main code here, to run repeatedly:
//  int bend1 =analogRead(bendPin);
  int pos1read = analogRead(Pot1Pin);
  int pos2read = analogRead(Pot2Pin);
//  Serial.println(SensorOne.readFloatAccelZ(), 4);

  
//  Serial.println(pos1read);
  
  int pos1 = map(pos1read,0,1023,60,520);
  int pos2 = map(pos2read,0,1023,60,520);
  if(SensorOne.readFloatAccelZ()< 0.8){
    bend1 = 1;
  }
  else{
    bend1 = 0;
  }
  if(SensorTwo.readFloatAccelZ()< 0.8){
    bend2 = 1;
  }
  else{
    bend2 = 0;
  }

  rot1 = atan2(SensorOne.readFloatAccelY(), SensorOne.readFloatAccelX());
  rot2 = atan2(SensorTwo.readFloatAccelY(), SensorTwo.readFloatAccelX());
//Serial.println(SensorOne.readFloatAccelY());
  Serial.print(pos1);
  Serial.print(":");
  Serial.print(pos2);
  Serial.print(":");
  Serial.print(bend1);
  Serial.print(":");
  Serial.print(bend2);
  Serial.print(":");
  Serial.print(rot1);
  Serial.print(":");
  Serial.print(rot2);
  Serial.println("~");
  delay(100);

}
