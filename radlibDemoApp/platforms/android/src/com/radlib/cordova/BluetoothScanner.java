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
import org.json.JSONException;
import org.json.JSONObject;

import android.provider.Settings.Secure;
import android.telephony.TelephonyManager;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.UUID;

public class BluetoothScanner extends CordovaPlugin {

	private BluetoothThread bluetoothThread;
	private BluetoothAdapter adapter = BluetoothAdapter.getDefaultAdapter();
	//private byte[] buffer;
	
	private static final UUID KNOWN_UUID = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");
	
	private void readFromBluetooth(CallbackContext callbackContext){
		
	}
	
	private class BluetoothThread extends Thread {
		private BluetoothDevice device;
		private CallbackContext callbackContext;
		private BluetoothSocket socket;
		private InputStream iStream;
		private OutputStream oStream;
		StringBuilder sb;
		
		public BluetoothThread(BluetoothDevice device, CallbackContext callbackContext){
			this.device = device;
			this.callbackContext = callbackContext;
			try {
				socket = device.createRfcommSocketToServiceRecord(KNOWN_UUID);
				socket.connect();
			}catch(IOException e){
				socket = null;
			}
			//adapter.cancelDiscovery();	
			
			try {
				iStream = socket.getInputStream();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		public void run() {
            byte[] data = new byte[1024];
            byte[] bufferT = new byte[1024];
            sb = new StringBuilder(1024);
            int bytes = 0;
			int nextFrameStart;

            // Keep listening to the InputStream while connected
            while (true) {
            	try {
					bytes = iStream.read(bufferT);
					if(bytes > 0){
						data = Arrays.copyOf(bufferT,bytes);
						
						String str = new String(data, "UTF-8");
						sb.append(str);
					}
					
					nextFrameStart = sb.lastIndexOf("~~~~~~~~HEADER~~~~~~~~");
					if(nextFrameStart > 0){
						//send everything up until the next frame
						String frameToSend = sb.substring(0, nextFrameStart);
						PluginResult result = new PluginResult(PluginResult.Status.OK, frameToSend);
					    result.setKeepCallback(true);
					    callbackContext.sendPluginResult(result);
					        
					    //start building up the next frame
					    String nextFrame = sb.substring(nextFrameStart, sb.length());
					    sb = new StringBuilder(1024);
					    sb.append(nextFrame);
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
		
		if(action.equals("scan")){
			scanNearbyBluetooth(callbackContext);
			//callbackContext.success("scan success");
			return true;
		}else if(action.equals("connect")){
			connect((String)args.get(0), callbackContext);
		}else if(action.equals("stop")){
			stop();
			callbackContext.success("success stop");
			return true;
		}
		callbackContext.error("did not not work");
		return false;
	}
	
	public void scanNearbyBluetooth(final CallbackContext callbackContext){
		if(!adapter.isEnabled()){
			adapter.enable();
		}
	
		adapter.startDiscovery();
		IntentFilter filter = new IntentFilter();
		BroadcastReceiver mReceiver = new BroadcastReceiver() {
			
			ArrayList<CharSequence> deviceNames = new ArrayList<CharSequence>();
			ArrayList<CharSequence> deviceAddresses = new ArrayList<CharSequence>();
			
	        public void onReceive(Context context, Intent intent) {
	            String action = intent.getAction();

	            if (BluetoothAdapter.ACTION_DISCOVERY_STARTED.equals(action)) {
	            	deviceNames = new ArrayList<CharSequence>();
					deviceAddresses = new ArrayList<CharSequence>();
					
	            } else if (BluetoothAdapter.ACTION_DISCOVERY_FINISHED.equals(action)) {
	            	String[] deviceNamesArray = new String[deviceNames.size()];
	            	for(int i = 0; i < deviceNames.size(); i++){
	            		deviceNamesArray[i] = deviceNames.get(i).toString() + deviceAddresses.get(i).toString();
	            	}
	            	
	            	AlertDialog.Builder builder = new AlertDialog.Builder(cordova.getActivity());
	            	builder.setTitle("Pick a bluetooth device");
	            	builder.setItems(deviceNamesArray, new DialogInterface.OnClickListener() {
	            	    @Override
	            	    public void onClick(DialogInterface dialog, int which) {
	            	        connect(deviceAddresses.get(which).toString(), callbackContext);
	            	    }
	            	});
	            	builder.show();
					
	            } else if (BluetoothDevice.ACTION_FOUND.equals(action)) {
	                BluetoothDevice device = (BluetoothDevice) intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
	                deviceNames.add(device.getName());
	                deviceAddresses.add(device.getAddress());
	            }
	        }
	    };
		AlertDialog.Builder builder = new AlertDialog.Builder(cordova.getActivity());
	            	builder.setTitle("Pick a bluetooth device");
		filter.addAction(BluetoothDevice.ACTION_FOUND);
		filter.addAction(BluetoothAdapter.ACTION_DISCOVERY_STARTED);
		filter.addAction(BluetoothAdapter.ACTION_DISCOVERY_FINISHED);
		 
		cordova.getActivity().registerReceiver(mReceiver, filter);		
	}
	
	public void connect(String address, CallbackContext callbackContext){
		BluetoothDevice device = adapter.getRemoteDevice(address);
		bluetoothThread = new BluetoothThread(device,callbackContext);
		bluetoothThread.start();
	
	}
	
	public void stop(){
	//	adapter.cancelDiscovery();
		
	}
}
