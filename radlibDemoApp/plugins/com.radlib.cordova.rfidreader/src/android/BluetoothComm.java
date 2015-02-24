package com.radlib.cordova;

import android.app.AlertDialog;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothSocket;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.IntentFilter;
import org.apache.cordova.*;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.provider.Settings.Secure;
import android.telephony.TelephonyManager;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.UUID;

public class BluetoothComm extends CordovaPlugin {

   private BluetoothThread bluetoothThread;
   private BluetoothAdapter adapter = BluetoothAdapter.getDefaultAdapter();
    
   private static final UUID KNOWN_UUID = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");
   
   /**
      Thread for initializing an IOStream communiction with a bluetooth device. Will send all data
      back to the cordova callback function set in as the phone receives the data.
   */
   private class BluetoothThread extends Thread {
      private BluetoothDevice device;
      private CallbackContext callbackContext;
      private BluetoothSocket socket;
      private InputStream iStream;
      private OutputStream oStream;
      StringBuilder sb;
        
      /**
         Initializes the thread.
      */
      public BluetoothThread(BluetoothDevice device, CallbackContext callbackContext){
         this.device = device;
         this.callbackContext = callbackContext;
         try {
            socket = device.createRfcommSocketToServiceRecord(KNOWN_UUID);
            socket.connect();
         }catch(IOException e){
            socket = null;
         }   
            
         try {
            iStream = socket.getInputStream();
         } catch (IOException e) {
            e.printStackTrace();
         }
      }
        
      public void run() {
         byte[] data = new byte[1024];
         byte[] bufferT = new byte[1024];
         sb = new StringBuilder(1024);
         int bytes = 0;

         // Keep listening to the InputStream while connected
         while (true) {
            try {
               bytes = iStream.read(bufferT);
               if(bytes > 0){
                  data = Arrays.copyOf(bufferT,bytes);
                        
                  String str = new String(data, "UTF-8");
                  PluginResult result = new PluginResult(PluginResult.Status.OK, str);
                  result.setKeepCallback(true);
                  callbackContext.sendPluginResult(result);
               }
            } catch (IOException e) {
               e.printStackTrace();
            }
         }
      } 
   }
    
   @Override
   public boolean execute(String action, CordovaArgs args, CallbackContext callbackContext) 
    throws JSONException {
        
      if(action.equals("startDiscovery")){
         scanNearbyBluetooth(callbackContext);
         return true;
      }else if(action.equals("connect")){
         connect((String)args.get(0), callbackContext);
         return true;
      }else if(action.equals("stopDiscovery")){
         stopBluetoothScan();
         callbackContext.success("success stop");
         return true;
      }else if(action.equals("turnOnBT")){
         turnOnBT();
         callbackContext.success("Bluetooth enabled!");
         return true;
      }else if(action.equals("turnOffBT")){
         turnOffBT();
         callbackContext.success("Bluetooth disabled!");
         return true;
      }
      callbackContext.error("Invalid command!");
      return false;
   }
    
   /**
      Scans for nearby blue tooth devices, and shows an AlertDialog menu upon completion of scan. 
      The AlertDialog will contain a list of the device names and mac addresses.
      Selecting from menu will then call connectTo() with the selected mac address.
      @...  callback function
   */
   public void scanNearbyBluetooth(final CallbackContext callbackContext){
      if(!adapter.isEnabled()){
         callbackContext.error("Please turn on Bluetooth");
      }
    
      //start looking for nearby bluetooth devices
      adapter.startDiscovery();
        
      //initialize the intent and receiver for the main activity to access later
      IntentFilter filter = new IntentFilter();
      BroadcastReceiver mReceiver = new BroadcastReceiver() {
            
         ArrayList<CharSequence> deviceNames = new ArrayList<CharSequence>();
         ArrayList<CharSequence> deviceAddresses = new ArrayList<CharSequence>();   
            
         public void onReceive(Context context, Intent intent) {
            String action = intent.getAction();

            //create new empty lists when discovery action is started
            if (BluetoothAdapter.ACTION_DISCOVERY_STARTED.equals(action)) {
               deviceNames = new ArrayList<CharSequence>();
               deviceAddresses = new ArrayList<CharSequence>();   
                    
            //add the found device to the lists
            }else if (BluetoothDevice.ACTION_FOUND.equals(action)) {
               BluetoothDevice device = (BluetoothDevice) intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
               deviceNames.add(device.getName());
               deviceAddresses.add(device.getAddress());
                
            //display the Alert Dialog with the list of devices and cancel button
            }else if (BluetoothAdapter.ACTION_DISCOVERY_FINISHED.equals(action)) {
               try {
            	   JSONArray returnArray= new JSONArray();
            	   JSONObject returnObject;
            	   for(int i = 0; i < deviceNames.size(); i++){
            		   returnObject = new JSONObject();
    	               returnObject.put("name", deviceNames.get(i));
    	               returnObject.put("address", deviceAddresses.get(i));
    	               returnArray.put(returnObject); 
            	   }
                  callbackContext.success(returnArray);
               } catch (JSONException e) {
                  e.printStackTrace();
               }    
            }
         }
      };
        
      filter.addAction(BluetoothDevice.ACTION_FOUND);
      filter.addAction(BluetoothAdapter.ACTION_DISCOVERY_STARTED);
      filter.addAction(BluetoothAdapter.ACTION_DISCOVERY_FINISHED);
         
      //adds the intent and receiver to the main activity
      cordova.getActivity().registerReceiver(mReceiver, filter);      
   }
    
   /** 
      Connects to the device with mac address : "address"
      @callbackContext way to access callbacks later
      @macAddress the mac address of the blue tooth device to connect to
   */
   public void connect(String address, CallbackContext callbackContext){
      if(!adapter.isEnabled()){
         callbackContext.error("Please turn on Bluetooth");
      }
        
      BluetoothDevice device = adapter.getRemoteDevice(address);
      bluetoothThread = new BluetoothThread(device,callbackContext);
      bluetoothThread.start();
    
   }
    
   /**
      Stops discovery of other bluetooth devices.
   */
   public void stopBluetoothScan(){
      adapter.cancelDiscovery();  
   }
    
   /**
      Enables blue tooth device on phone/local hardware.
   */
   public void turnOnBT(){
      if(!adapter.isEnabled()){
         adapter.enable();
      }
   }
    
   /**
      Disables blue tooth device on phone/local hardware.
   */
   public void turnOffBT(){
      if(adapter.isEnabled()){
         adapter.disable();
      }
   }
}
