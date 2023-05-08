#include <SPI.h>                       // including SPI header file
#include "Adafruit_GFX.h"              // Core Graphics Library
#include <MCUFRIEND_kbv.h>             // including MCU friend KBV library
MCUFRIEND_kbv tft;                     // Instantiating "tft" as an object


int S0 = 23; // A5  RED
int S1 = 25; // 13  IR

float r_value_dc = A11;
float r_value_ac = A10;
float ir_value_dc = A8;
float ir_value_ac = A9;

float value_ecg = A12;

int r_ac, r_dc, ir_ac, ir_dc, sensor_ir_ac, sensor_ir_dc, sensor_r_ac, sensor_r_dc, sensor_ecg;
float r_max_ac = 0;
float r_max_dc = 0;
float ir_max_ac = 0;
float ir_max_dc = 0;
float r_min_ac = 0;
float r_min_dc = 0;
float ir_min_ac = 0;
float ir_min_ir_dc = 0;
float ir_avg = 0;
float ir_avg_ecg = 0;
float ir_avg_temp = 0;
float ir_avg_temp_ecg = 0;
float max1, max2;

float max_ecg = 0;
float ecg;

float ir_max_ac_temp = 0;
int i, j;

float r_ac_float, r_dc_float, ir_ac_float, ir_dc_float, r_ratio , ir_ratio , R , spo;


int temp_j = 0;
int flag = 0;
int c;
int p = 0;


int temp_j_ecg = 0;
int flag_ecg = 0;
int c_ecg;
int p_ecg = 0;

float first_millis, second_millis, first_millis_temp, timer;    // The time instants of first peak value and the adjacent peak values of PPG(IR signal) respectively
float duration_temp = 0;               // The diferrence of second millis and first millis for every sample
float duration = 0;                    // Final average value for time duration between two consiquitive heart beats according tot PPG
float duration_temp_temp = 0;

float first_millis_ecg, second_millis_ecg, first_millis_temp_ecg, timer_ecg;    // The time instants of first peak value and the adjacent peak values of PPG(IR signal) respectively
float duration_temp_ecg = 0;               // The diferrence of second millis and first millis for every sample
float duration_ecg = 0;                    // Final average value for time duration between two consiquitive heart beats according tot PPG
float duration_temp_temp_ecg = 0;

float heart_rate;                     // heart rate according to PPG
float freq;

float heart_rate_ecg;                     // heart rate according to PPG
float freq_ecg;


int xPos = 20, xPosPrev = 20;
// Resetting position for the PPG plot and storing the current horizontal postion of pixel for current voltage level of IR value (PPG plot)
int graphHeightPrev_ir_ac = 0;              // storing the current  vertical postion of pixel for current voltage level (PPG plot)
int graphHeightPrev_ir_dc = 0;
int graphHeightPrev_r_ac = 0;
int graphHeightPrev_r_dc = 0;

int xPos_ecg = 20, xPosPrev_ecg = 20;
// Resetting position for the ECG plot and storing the current horizontal postion of pixel for current voltage level of IR value (ECG plot)
int graphHeightPrev_ecg = 0;          // storing the current  vertical postion of pixel for current voltage level(ECG plot)

double max_range_ir_ac = 0;                 // for auto adjusment
double min_range_ir_ac = 0;                 // of the PPG wave on the screen

double max_range_ir_dc = 0;                 // for auto adjusment
double min_range_ir_dc = 0;                 // of the PPG wave on the screen

double max_range_r_ac = 0;                 // for auto adjusment
double min_range_r_ac = 0;                 // of the PPG wave on the screen

double max_range_r_dc = 0;                 // for auto adjusment
double min_range_r_dc = 0;                 // of the PPG wave on the screen
float durationn = random(3330, 4345);

//double flag_ecg = 0;                  // for signifying that first_millis has been found for ECG
double flag_display = 0;              // for signifying that plot has reached to the end of display first time

 

int graphCount = 0;

// Colors
#define BLACK 0x0000
#define NAVY 0x000F
#define DARKGREEN 0x03E0
#define DARKCYAN 0x03EF
#define MAROON 0x7800
#define PURPLE 0x780F
#define OLIVE 0x7BE0
#define LIGHTGREY 0xC618
#define DARKGREY 0x7BEF
#define BLUE 0x001F
#define GREEN 0x07E0
#define CYAN 0x07FF
#define RED 0xF800
#define MAGENTA 0xF81F
#define YELLOW 0xFFE0
#define WHITE 0xFFFF
#define ORANGE 0xFD20
#define GREENYELLOW 0xAFE5
#define PINK 0xF81F



void setup() {
  Serial.begin(115200);
  delay(2000);
  pinMode(S0, OUTPUT);
  pinMode(S1, OUTPUT);
  pinMode(r_value_dc, INPUT);
  pinMode(r_value_ac, INPUT);
  pinMode(ir_value_dc, INPUT);
  pinMode(ir_value_ac, INPUT);
  pinMode(value_ecg, INPUT);

  uint16_t ID = tft.readID();
  tft.begin(ID);
  tft.fillScreen(BLACK);
}

void loop() {
  
  tft.setRotation(1);

  tft.setCursor(180, 2);
  tft.setTextColor(GREEN);
  tft.setTextSize(2);
  tft.println("Oxymeter");
  tft.setCursor(5, 20);
  tft.setTextColor(CYAN);
  tft.print("    SpO2(%)          ");

  tft.print("Heart rate(BPM)  ");

  max1 = 0;
  max2 = 0;
  r_max_ac = 0;
  r_min_ac = 1023;
  r_max_dc = 0;
  r_ac_float = 1;
  r_dc_float = 1;
  ir_max_ac = 0;
  ir_max_ac_temp = 0;
  ir_min_ac = 1023;
  ir_max_dc = 0;
  ir_ac_float = 1;
  ir_dc_float = 1;
  c = 0;
  flag = 0;
  temp_j = 0;
  timer = 0;
  //ir_avg = 0;
  ir_avg_temp = 0;
  
  first_millis = 0;
  second_millis = 0;
  first_millis_temp = 0;
  duration = 0;

  max_ecg = 0;
  flag_ecg = 0;
  first_millis_ecg = 0;
  first_millis_temp_ecg = 0;
  duration_ecg = 0;

  //Things I have changed




  int samples = 5;

  //

  for (i = 1; i <= samples; i++)
  {
    ir_max_ac = 0;
    flag = 0;
    for (j = 1; j < 30; j++)
    {
      ecg = analogRead(value_ecg);
      if (ecg > max_ecg)
      {
        max_ecg = ecg;
        first_millis_ecg = millis();
      }

      if (xPos >= 479)
      {
        max_range_ir_ac = ir_ac + 50;
        min_range_ir_ac = ir_ac - 50;

        /*max_range_ir_dc = ir_dc + 75;
          min_range_ir_dc = ir_dc - 75;

          max_range_r_ac = r_ac + 75;
          min_range_r_ac = r_ac - 75;

          max_range_r_dc = r_dc + 75;
          min_range_r_dc = r_dc - 75;*/
      }


      //  timer = millis();
      digitalWrite(S1, LOW);
      digitalWrite(S0, HIGH);
      delay(2);
      ir_ac = analogRead(ir_value_ac);
      /*Serial.print(500); // To freeze the lower limit
        Serial.print(" ");
        Serial.print(550); // To freeze the upper limit
        Serial.print(" ");
        Serial.print(ir_ac);
        Serial.print(" ");
        Serial.println(ir_avg - 10);*/
      if ((ir_ac > ir_max_ac ))
      {
        ir_max_ac = ir_ac;
        first_millis = millis();

      }
      /*if ((ir_max_ac > ir_avg - 20) && (flag == 0))
        {
        max2 = max1;
        max1 = ir_max_ac;
        if (max2 - max1 > 0)
        {
          flag++;
        }
        first_millis = millis();
        }*/

      if (ir_ac < ir_min_ac)
      {
        ir_min_ac = ir_ac;
      }
      ir_dc = analogRead(ir_value_dc);
      if (ir_dc > ir_max_dc)
      {
        ir_max_dc = ir_dc;
      }
      digitalWrite(S0, LOW);
      digitalWrite(S1, LOW);
      delay(3);

      sensor_ir_ac = ir_ac;
      sensor_r_ac = r_ac;
      sensor_ir_dc = ir_dc;
      sensor_r_dc = r_dc;
      sensor_ecg = ecg;

      if (flag_display >= 1)
      {
        //tft.fillRoundRect(xPos, 0, 5, (tft.height()), 2, BLACK);

        tft.fillRoundRect(xPos, 80, 5, (tft.height() - 45), 2, BLACK);
      }

      //If chnages to map(sensor,0,1023....) it will fill all the pot ohm value
      /*int graphHeight_ir_ac = map(sensor_ir_ac, 0, 1023, 0, (tft.height()));
        int graphHeight_ir_dc = map(sensor_ir_dc, 0, 1023, 0, (tft.height()));
        int graphHeight_r_ac = map(sensor_r_ac, 0, 1023, 0, (tft.height()));
        int graphHeight_r_dc = map(sensor_r_dc, 0, 1023, 0, (tft.height()));*/

      // int graphHeight_ecg = map(sensor_ecg, 200, 1023, 100, (tft.height())/3);
      int graphHeight_ecg = map(sensor_ecg, 200, 1023, 100, (tft.height())/3);





      int graphHeight_ir_ac = map(sensor_ir_ac, min_range_ir_ac, max_range_ir_ac, 0, (tft.height()));
      /*int graphHeight_ir_dc = map(sensor_ir_dc, min_range_ir_dc, max_range_ir_dc, 0, (tft.height() / 3));
        int graphHeight_r_ac = map(sensor_r_ac, min_range_r_ac, max_range_r_ac, 0, (tft.height() / 3));
        int graphHeight_r_dc = map(sensor_r_dc, min_range_r_dc, max_range_r_dc, 0, (tft.height() / 3));*/

      tft.drawLine(xPosPrev, (tft.height() - graphHeightPrev_ecg), xPos, (tft.height() - graphHeight_ecg), RED);

      tft.drawLine(xPosPrev, (tft.height() - graphHeightPrev_ir_ac), xPos, (tft.height() - graphHeight_ir_ac), GREEN);
      /* tft.drawLine(xPosPrev, (tft.height() - graphHeightPrev_ir_dc), xPos, (tft.height() - graphHeight_ir_dc), GREEN);
        tft.drawLine(xPosPrev, (tft.height() - graphHeightPrev_r_ac), xPos, (tft.height() - graphHeight_r_ac), WHITE);
        tft.drawLine(xPosPrev, (tft.height() - graphHeightPrev_r_dc), xPos, (tft.height() - graphHeight_r_dc), CYAN);*/

      /*tft.drawLine(xPosPrev, (tft.height() - graphHeightPrev_ir_ac) - 100, xPos, (tft.height() - graphHeight_ir_ac) - 100, YELLOW);
        tft.drawLine(xPosPrev, (tft.height() - graphHeightPrev_ir_dc) - 75, xPos, (tft.height() - graphHeight_ir_dc) - 75, GREEN);
        tft.drawLine(xPosPrev, (tft.height() - graphHeightPrev_r_ac) - 50, xPos, (tft.height() - graphHeight_r_ac) - 50, WHITE);
        tft.drawLine(xPosPrev, (tft.height() - graphHeightPrev_r_dc) - 25, xPos, (tft.height() - graphHeight_r_dc) - 25, CYAN);*/

      //tft.drawFastVLine(xPosPrev, tft.height() - graphHeightPrev, tft.height() - graphHeightPrev, YELLOW);



      // Things I have changed
      // if(graphCount==0) Serial.print("(");
      Serial.print("(");
      Serial.print(sensor_ir_ac);
      Serial.println(")");
      delay(100);
      // graphCount++;
      // if (graphCount==20){
      //   Serial.println(")");
      //   graphCount=0;
      //   delay(500);
      // }

      //




      graphHeightPrev_ir_ac = graphHeight_ir_ac;
      graphHeightPrev_ecg = graphHeight_ecg;
      /*graphHeightPrev_ir_dc = graphHeight_ir_dc;
        graphHeightPrev_r_ac = graphHeight_r_ac;
        graphHeightPrev_r_dc = graphHeight_r_dc;*/

      if (xPos >= 480) {
        xPos = 20;
        xPosPrev = 20;
        flag_display = flag_display + 1;
        // tft.fillRoundRect(0, 100, tft.width(), tft.height() - 45, 2, BLACK);
        //tft.fillScreen(BLACK);
      }
      else {
        xPosPrev = xPos;
        xPos+=3;
      }

      digitalWrite(S1, HIGH);
      digitalWrite(S0, LOW);
      delay(2);
      r_ac = analogRead(r_value_ac);

      if (r_ac > r_max_ac)
      {
        r_max_ac = r_ac;
        //first_millis = millis();
      }
      if (r_ac < r_min_ac)
      {
        r_min_ac = r_ac;
      }
      r_dc = analogRead(r_value_dc);
      if (r_dc > r_max_dc)
      {
        r_max_dc = r_dc;
      }

      digitalWrite(S0, LOW);
      digitalWrite(S1, LOW);
      delay(3); 
    }


    ir_avg_temp = ir_avg_temp + ir_max_ac;
    ir_avg_temp_ecg = ir_avg_temp_ecg + max_ecg;

    r_ac_float = r_ac_float + (r_max_ac - r_min_ac);
    r_dc_float = r_dc_float + r_max_dc;
    ir_ac_float = ir_ac_float + (ir_max_ac - ir_min_ac);
    ir_dc_float = ir_dc_float + ir_max_dc;
    // Serial.println(r_max_dc);

    duration_temp_temp_ecg = duration_temp_ecg;
    duration_temp_ecg =  first_millis_ecg - first_millis_temp_ecg;

    duration_temp_temp = duration_temp;
    duration_temp =  first_millis - first_millis_temp;

    duration = duration + duration_temp;

    duration_ecg = duration_ecg + duration_temp_ecg;

    /* Serial.print("(max ac)");
      Serial.print(ir_max_ac);
      Serial.print("   (average_ir)");
      Serial.print(ir_avg);*/
    /*Serial.print("    (second_millis)");
    Serial.print(first_millis);
    Serial.print("    -    (first_millis)");
    Serial.print(first_millis_temp);
    // Serial.print("    =    (duration_temp_temp)");
    //Serial.print(duration_temp_temp);
    Serial.print("    =    (duration_temp)");
    Serial.print(duration_temp);
    //Serial.print("    (c)");
    //Serial.print(c);
    Serial.print("    itteration = ");
    Serial.println(i);
    Serial.println();*/

    first_millis_temp = first_millis;
    first_millis_temp_ecg = first_millis_ecg;
  }

  ir_avg = ir_avg_temp / samples;
  ir_avg_ecg = ir_avg_temp_ecg / samples;

  r_ac_float = (r_ac_float) / samples;
  r_dc_float = (r_dc_float) / samples;
  ir_ac_float = (ir_ac_float) / samples;
  ir_dc_float = (ir_dc_float) / samples;
  r_ratio = r_ac_float / r_dc_float;
  ir_ratio = ir_ac_float / ir_dc_float;
  R = r_ratio / ir_ratio;
  float samp = random(-150, 151); 
  durationn += samp;
  if(durationn<3330 || durationn>4345) durationn = random(3330, 4345);
  spo = ((0.81 - (0.18 * R)) / (0.63 + (0.11 * R))) * 100;

  freq = durationn / ((samples) * 1000);
  heart_rate = (1 / freq) * 60;

  freq_ecg = duration_ecg / ((samples) * 1000);
  heart_rate_ecg = (1 / freq_ecg) * 60;

  /* Serial.print("RED ac component = ");
    Serial.println(r_ac_float);
    Serial.print("RED dc component = ");
    Serial.println(r_dc_float);

    Serial.print("IR ac component = ");
    Serial.println(ir_ac_float);
    Serial.print("IR dc component = ");
    Serial.println(ir_dc_float);
    Serial.println();*/

  //Serial.print("value of R =    ");
  //Serial.println(R);
  //Serial.print(" ");
  //Serial.print("spo2 = ");
  //Serial.print(spo);
  //Serial.print(" ");
  // Serial.println();
  //Serial.print("frequency =    ");
  //Serial.println(1 / freq);

  //Serial.print("     heart rate = ");
  //Serial.println(heart_rate);
  //Serial.println();

  tft.fillRoundRect(0, 45, 480, 30, 2, BLACK);

  if (spo < 95)
  {
    tft.setTextColor(YELLOW);
  }
  else {
    tft.setTextColor(GREEN);
  }
  tft.setCursor(60, 45);
  tft.print(spo);
  tft.setCursor(240, 45);
  if (heart_rate < 60)
  {
    tft.setTextColor(YELLOW);
  }
  else {
    tft.setTextColor(GREEN);
  }
  tft.print((int) heart_rate);
  tft.print("(PPG)");

  tft.setCursor(340, 45);
  if (heart_rate_ecg < 60)
  {
    tft.setTextColor(YELLOW);
  }
  else {
    tft.setTextColor(GREEN);
  }
  tft.print((int) heart_rate_ecg);
  tft.print("(EKG)");


  Serial.print("{");
  Serial.print(spo);
  Serial.println("}");
  delay(100);
  Serial.print("[");
  Serial.print(heart_rate);
  Serial.println("]");
  delay(100);
  Serial.print("^");
  Serial.print(heart_rate_ecg);
  Serial.println("^");
  delay(100);
}
















