package com.circle.geolocation;

import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;

import android.util.Log;
import com.circle.MainActivity;
import android.os.Bundle;
import android.content.Context;
import org.json.JSONObject;
import org.json.JSONException;
import android.location.Location;
import android.location.Criteria;
import android.location.LocationListener;
import android.location.LocationManager;


public class GeolocationModule extends ReactContextBaseJavaModule {

    private GeoLocationListener locationListener = null;
    private LocationManager locationManager = null;

    private static class GeoLocationListener implements LocationListener {
        public static double lng;
        public static double lat;
        public static Boolean updated = false;

        @Override
        public void onLocationChanged(Location loc) {
            Log.w("Geolocation", "IN ON LOCATION CHANGE, lat=" + loc.getLongitude() + ", lon=" + loc.getLatitude());
            lng = loc.getLongitude();
            lat = loc.getLatitude();
            updated = true;
        }

        @Override
        public void onProviderDisabled(String provider) {
            // TODO Auto-generated method stub
        }

        @Override
        public void onProviderEnabled(String provider) {
            // TODO Auto-generated method stub
        }

        @Override
        public void onStatusChanged(String provider,
            int status, Bundle extras) {
            // TODO Auto-generated method stub
        }
    }

  public GeolocationModule(ReactApplicationContext reactContext) {
    super(reactContext);
    locationListener = new GeoLocationListener();
    locationManager = (LocationManager) reactContext.getSystemService(Context.LOCATION_SERVICE);
    locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 10000, 50, locationListener);
    locationManager.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, 10000, 50, locationListener);
  }

   @Override
   public String getName() {
     return "Geolocation";
   }

   @ReactMethod
    public void getCurrentLocation(Promise promise) {
        if (locationListener.updated) {
            WritableMap map = Arguments.createMap();
            map.putDouble("lat", locationListener.lat);
            map.putDouble("lng", locationListener.lng);
            promise.resolve(map);
        } else {
            Criteria criteria = new Criteria();
            String bestProvider = locationManager.getBestProvider(criteria, false);
            android.location.Location location = locationManager.getLastKnownLocation(bestProvider);
            WritableMap map = Arguments.createMap();
            map.putDouble("lat", location.getLatitude());
            map.putDouble("lng", location.getLongitude());
            promise.resolve(map);
        }
    }
}
