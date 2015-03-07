RadLib
=======================================================
An Apache Cordova plugin that allows for interfacing mobile applications with RFID tag readers.
######The currently supported readers are as follows:
- [Technology Solutions 1128 Bluetooth UHF Reader](http://www.tsl.uk.com/products/1128-bluetooth-handheld-uhf-rfid-reader/)
- [RC522 HF Reader](http://playground.arduino.cc/Learning/MFRC522)
- [Barcode scanner using phone camera](https://github.com/wildabeast/BarcodeScanner)

######Supported Platforms
- Android 4.4+

If you're comfortable with JavaScript, HTML, and CSS, it's easy to make your own app with RadLib!

#Installation - Quick Start
Make sure you have the [Cordova Command-Line Interface](http://www.google.com/url?q=http%3A%2F%2Fcordova.apache.org%2Fdocs%2Fen%2F3.6.0%2F%2Fguide_cli_index.md.html%23The%2520Command-Line%2520Interface&sa=D&sntz=1&usg=AFQjCNGC6EfuvxtBLI_TRexDGn15S0xdsA) and the Android SDK installed.

Run the command `git clone https://github.com/radlib/radlib-cordova.git` to download all the files for our sample application. 
If you have an Android hardware device, you can run `cordova run android` to flash the demo application to your device.

#Installation - Starting from Scratch
Follow the instructions to start a new project with RadLib at the [Cordova Plugin Registry](http://plugins.cordova.io/#/package/com.radlib.cordova.rfidreader).

#Using RadLib
The plugin declares two global objects, `radlib` and `bluetoothUtils`.

The `radlib` object has two functions,  `connect()` and `scan()`:

<table>
  <tr>
    <td colspan="2"><code>radlib.scan = function (success, failure, connectionTypes);</code></td>
  </tr>
  <tr>
    <td colspan="2">Description:</td>
  </tr>
  <tr>
    <td><code>success</code></td>
    <td>
      A function that is called back on success. On success, the callback function will be provided with an object with the following properties:
      <ul>
        <li>name: name of the found device</li>
        <li>address: address of the found device</li>
        <li>connectionType: an array of connection type strings. Currently only ["BLUETOOTH"] is supported.</li>
      <ul>
    </td>
  </tr>
  <tr>
    <td><code>failure</code></td>
    <td>
      A function that is called back on failure. Failure includes providing an invalid <code>connectionTypes</code> value
    </td>
  </tr>
  <tr>
    <td><code>connectionTypes</code></td>
    <td>
     An array of connectionType to scan for. Currently the only supported value inside <code>connectionTypes</code> is "BLUETOOTH"
    </td>
  </tr>
</table>

<table>
  <tr>
    <td colspan="2"><code>radlib.connect = function (success, failure, reader);</code></td>
  </tr>
  <tr>
    <td colspan="2">Description:</td>
  </tr>
  <tr>
    <td><code>success</code></td>
    <td>
      A function that is called back on success. On success, the callback function will be provided with an object with the following properties:
      <ul>
        <li>id: id of tag that was read</li>
        <li>reader: device name of the reader</li>
        <li>time: time the frame was read in the form HH:mm:ss AM/PM</li>
        <li>date: date the frame was read in the form MM:dd:yyyy</li>
        <li>frame: the frame of data which was parsed</li>
      <ul>
    </td>
  </tr>
  <tr>
    <td><code>failure</code></td>
    <td>
      A function that is called back on failure. Failure includes failing to connect to the specified device or providing a wrong property to <code>reader</code>.
    </td>
  </tr>
  <tr>
    <td><code>reader</code></td>
    <td>
      An object with the following required properties:
      <ul>
        <li>model: model of the reader device (only required for "BLUETOOTH" connectionType). Current accepted models are "ARDUINO_RC522_HF" or "TSL_1128_UHF"</li>
        <li>address: address of the reader device (only required for "BLUETOOTH" connectionType)</li>
        <li>connectionType: type of connection for device. Currently only "BLUETOOTH" and "CAMERA" are supported</li>
      </ul>
      Note: the required properties for this reader object are similar to what is returned in <code>scan()</code>. It is possible to save the object obtained from <code>scan()</code>, add a model property to it, and then use it for <code>connect()</code>.
    </td>
  </tr>
</table>

The `bluetoothUtils` object has three functions: `turnOnBluetooth()`, `turnOffBluetooth()`, and `stopDiscovery()`:

<table>
  <tr>
    <td colspan="2"><code>bluetoothUtils.turnOnBluetooth = function(success, failure);</code></td>
  </tr>
  <tr>
    <td colspan="2">Description: enables the Bluetooth module located in the Android phone</td>
  </tr>
  <tr>
    <td><code>success</code></td>
    <td>
      Callback function providing a success message
    </td>
  </tr>
  <tr>
    <td><code>failure</code></td>
    <td>
      Callback function providing a failure message
    </td>
  </tr>
</table>

<table>
  <tr>
    <td colspan="2"><code>bluetoothUtils.turnOffBluetooth = function(success, failure);</code></td>
  </tr>
  <tr>
    <td colspan="2">Description: disables the Bluetooth module located in the Android phone</td>
  </tr>
  <tr>
    <td><code>success</code></td>
    <td>
      Callback function providing a success message
    </td>
  </tr>
  <tr>
    <td><code>failure</code></td>
    <td>
      Callback function providing a failure message
    </td>
  </tr>
</table>

<table>
  <tr>
    <td colspan="2"><code>bluetoothUtils.stopDiscovery = function(success, failure);</code></td>
  </tr>
  <tr>
    <td colspan="2">Description: tells the bluetooth device to finish up looking nearby bluetooth devices. This function only needs to be called if <code>radlib.scan()</code> for Bluetooth is to be stopped prematurely.
</td>
  </tr>
  <tr>
    <td><code>success</code></td>
    <td>
      Callback function providing a success message
    </td>
  </tr>
  <tr>
    <td><code>failure</code></td>
    <td>
      Callback function providing a failure message
    </td>
  </tr>
</table>
