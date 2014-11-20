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

import java.util.ArrayList;

public class BluetoothScanner extends CordovaPlugin {

	BluetoothAdapter adapter;

	@Override
	public boolean execute(String action, CordovaArgs args, CallbackContext callbackContext) 
	 throws JSONException {
		
		if(action.equals("scan")){
			scanNearbyBluetooth();
			callbackContext.success();
			return true;
		}
		callbackContext.error("did not work");
		return false;
	}
	
	public void scanNearbyBluetooth(){
		
		adapter = BluetoothAdapter.getDefaultAdapter();
		adapter.startDiscovery();
		IntentFilter filter = new IntentFilter();
		BroadcastReceiver mReceiver = new BroadcastReceiver() {
	        public void onReceive(Context context, Intent intent) {
	            String action = intent.getAction();
	            ArrayList<CharSequence> deviceNames = new ArrayList<CharSequence>();

	            if (BluetoothAdapter.ACTION_DISCOVERY_STARTED.equals(action)) {
	                //discovery starts, we can show progress dialog or perform other tasks
	            	deviceNames = new ArrayList<CharSequence>();
	            } else if (BluetoothAdapter.ACTION_DISCOVERY_FINISHED.equals(action)) {
	                //discovery finishes, dismis progress dialog
	            	CharSequence[] deviceNamesArray = new CharSequence[deviceNames.size()];
	            	for(int i = 0; i < deviceNames.size(); i++){
	            		deviceNamesArray[i] = deviceNames.get(i);
	            	}
	            	
	            	AlertDialog.Builder builder = new AlertDialog.Builder(cordova.getContent());
	            	builder.setTitle("Pick a bluetooth device");
	            	builder.setItems(deviceNamesArray, new DialogInterface.OnClickListener() {
	            	    @Override
	            	    public void onClick(DialogInterface dialog, int which) {
	            	        // the user clicked on colors[which]
	            	    }
	            	});
	            	builder.show();
	            } else if (BluetoothDevice.ACTION_FOUND.equals(action)) {
	                       //bluetooth device found
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
		 
		cordova.getContent().registerReceiver(mReceiver, filter);		
	}
}
