package com.radlib.cordova;

import android.app.AlertDialog;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.IntentFilter;
import org.apache.cordova.*;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class BluetoothScanner extends CordovaPlugin {

	BluetoothAdapter adapter = BluetoothAdapter.getDefaultAdapter();

	@Override
	public boolean execute(String action, CordovaArgs args, CallbackContext callbackContext) 
	 throws JSONException {
		
		if(action.equals("connect")){
			connectToBluetooth(
		}
		if(action.equals("scan")){
			scanNearbyBluetooth();
			callbackContext.success("success scan");
			return true;
		}else if(action.equals("stop")){
			stop();
			callbackContext.success("success stop");
			return true;
		}
		callbackContext.error("did not not work");
		return false;
	}
	
	public void connectToBluetooth(){
	
	}
	
	public void scanNearbyBluetooth(){
		adapter.startDiscovery();
		IntentFilter filter = new IntentFilter();
		BroadcastReceiver mReceiver = new BroadcastReceiver() {
			
			ArrayList<CharSequence> deviceNames = new ArrayList<CharSequence>();
			
	        public void onReceive(Context context, Intent intent) {
	            String action = intent.getAction();

	            if (BluetoothAdapter.ACTION_DISCOVERY_STARTED.equals(action)) {
	                
	            	deviceNames = new ArrayList<CharSequence>();
	            } else if (BluetoothAdapter.ACTION_DISCOVERY_FINISHED.equals(action)) {
	                
	            	CharSequence[] deviceNamesArray = new CharSequence[deviceNames.size()];
	            	for(int i = 0; i < deviceNames.size(); i++){
	            		deviceNamesArray[i] = deviceNames.get(i);
	            	}
	            	
	            	AlertDialog.Builder builder = new AlertDialog.Builder(cordova.getActivity());
	            	builder.setTitle("Pick a bluetooth device");
	            	builder.setItems(deviceNamesArray, new DialogInterface.OnClickListener() {
	            	    @Override
	            	    public void onClick(DialogInterface dialog, int which) {
	            	        
	            	    }
	            	});
	            	builder.show();
	            } else if (BluetoothDevice.ACTION_FOUND.equals(action)) {
	                
	                BluetoothDevice device = (BluetoothDevice) intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
	               
	                deviceNames.add(device.getName());
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
	
	public void stop(){
		adapter.cancelDiscovery();
	}
}
