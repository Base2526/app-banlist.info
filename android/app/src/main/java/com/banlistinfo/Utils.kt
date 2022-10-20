package com.banlistinfo

import android.app.*
import android.app.ActivityManager.RunningAppProcessInfo
import android.content.Context
import android.content.Context.NOTIFICATION_SERVICE
import android.content.Intent
import android.graphics.BitmapFactory
import android.graphics.Color
import android.os.Build
import android.telephony.TelephonyManager
import android.util.Log
import android.widget.RemoteViews
import androidx.core.app.NotificationCompat
import androidx.core.content.ContextCompat.getSystemService
import com.example.SearchMutation
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import kotlinx.coroutines.runBlocking
import okhttp3.internal.notify
import java.io.PrintWriter
import java.io.StringWriter


object Utils {
    open fun isAppIsInBackground(context: Context): Boolean {
        var isInBackground = true
        val am = context.getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager
        if (Build.VERSION.SDK_INT > Build.VERSION_CODES.KITKAT_WATCH) {
            val runningProcesses = am.runningAppProcesses
            for (processInfo in runningProcesses) {
                if (processInfo.importance == RunningAppProcessInfo.IMPORTANCE_FOREGROUND) {
                    for (activeProcess in processInfo.pkgList) {
                        if (activeProcess == context.packageName) {
                            isInBackground = false
                        }
                    }
                }
            }
        } else {
            val taskInfo = am.getRunningTasks(1)
            val componentInfo = taskInfo[0].topActivity
            if (componentInfo!!.packageName == context.packageName) {
                isInBackground = false
            }
        }
        return isInBackground
    }

    open fun killCall(context: Context): Boolean {
        return try {
            // Get the boring old TelephonyManager
            val telephonyManager =
                context.getSystemService(Context.TELEPHONY_SERVICE) as TelephonyManager

            // Get the getITelephony() method
            val classTelephony = Class.forName(telephonyManager.javaClass.name)
            val methodGetITelephony = classTelephony.getDeclaredMethod("getITelephony")
            // Ignore that the method is supposed to be private
            methodGetITelephony.isAccessible = true
            // Invoke getITelephony() to get the ITelephony interface
            val telephonyInterface = methodGetITelephony.invoke(telephonyManager)
            // Get the endCall method from ITelephony
            val telephonyInterfaceClass = Class.forName(telephonyInterface.javaClass.name)
            val methodEndCall = telephonyInterfaceClass.getDeclaredMethod("endCall")
            // Invoke endCall()
            methodEndCall.invoke(telephonyInterface)
            true
        } catch (e: java.lang.Exception) {
            e.printStackTrace()
            false
        }
    }

    open fun test_apollo(context: Context): Boolean {

        try {
//            val apolloClient = ApolloClient.Builder()
//                .serverUrl("https://apollo-fullstack-tutorial.herokuapp.com/graphql")
//                .build()
//            val response = apolloClient.query(LaunchesQuery()).execute()
//            Log.i("TAG", "")

            // Create a client
//            val apolloClient = ApolloClient.Builder()
//                .serverUrl("https://apollo-fullstack-tutorial.herokuapp.com/graphql")
//                .build()

//            val apolloClient = ApolloClient(
//                networkTransport = WebSocketNetworkTransport(
//                    serverUrl = "https://apollo-fullstack-tutorial.herokuapp.com/graphql",
//                    protocol = SubscriptionWsProtocol(
//                        connectionPayload = { emptyMap() }
//                    )
//                )
//            )

            // Execute your query. This will suspend until the response is received.
//            val response = apolloClient.query(LaunchesQuery()).execute()

//            lifecycleScope.launch {
//
//            }


//            GlobalScope.launch { // launch a new coroutine in background and continue
            runBlocking {


                val response = try {
//                    apolloClient(context).query(UserQuery(id="62a2c0cecf7946010d3c743f".toString())).execute()

                    /*
                    final SignupInput signupInput=SignupInput.builder()
                .firstName(edtSignUpName.getText().toString())
                .lastName(edtSignUpLastName.getText().toString())
                .email(actvSignUpEmail.getText().toString())
                .password(edtSignUpPassword.getText().toString())
                .profileImage("dasfasdfasdf.png").build();
                    */


                    apolloClient(context).mutation(SearchMutation(type= "phone", q = "abc")).execute()
                } catch (e: Exception) {
//                    println("Exception :$e.stackTraceToString()")

                    val stacktrace = StringWriter().also { e.printStackTrace(PrintWriter(it)) }.toString().trim()
                    println("Exception caught: $stacktrace")
                    null
                }

                println(response?.data)
                println("")


//                val seachMutation = SeachMutation()
//
//                val response = try {
//                    apolloClient(context).mutation(seachMutation).execute()
//                } catch (e: Exception) {
//                    println("")
//                    null
//                }
//
//                println(response?.data)
//                println("")
            }

            // Apollo runs query on background thread


            /*
            lifecycleScope.launch {

                apolloClient(this@MainActivity).subscription(TripsBookedSubscription()).toFlow()
                    .retryWhen { _, attempt ->
                        delay(attempt * 1000)
                        true
                    }
                    .collect {
                        val text = when (val trips = it.data?.tripsBooked) {
                            null -> getString(R.string.subscriptionError)
                            -1 -> getString(R.string.tripCancelled)
                            else -> getString(R.string.tripBooked, trips)
                        }
                        Snackbar.make(
                            findViewById(R.id.main_frame_layout),
                            text,
                            Snackbar.LENGTH_LONG
                        ).show()
                    }

            }
             */



            Log.i("TAG", "")
        }catch (e: Exception){
            println(e)
            Log.i("TAG", "")
        }
        return true;
    }

//    https://www.geeksforgeeks.org/notifications-in-kotlin/
//    getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
    open fun local_noti(context: Context){
        var notificationChannel: NotificationChannel
        var notificationManager= context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        var builder: Notification.Builder
        val channelId = "12345"
        val description = "Test Notification"

    /*
    *  val telephonyManager =
                context.getSystemService(Context.TELEPHONY_SERVICE) as TelephonyManager
    * */

        try {

            val intent = Intent(context, afterNotification::class.java)
            val pendingIntent = PendingIntent.getActivity(context, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT)
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                notificationChannel = NotificationChannel(channelId, description, NotificationManager .IMPORTANCE_HIGH)
                notificationChannel.lightColor = Color.BLUE
                notificationChannel.enableVibration(true)
                notificationManager.createNotificationChannel(notificationChannel)
                builder = Notification.Builder(context, channelId).setContentTitle("NOTIFICATION USING " +
                        "KOTLIN").setContentText("Test Notification").setSmallIcon(R.drawable.ic_launcher_foreground).setLargeIcon(
                    BitmapFactory.decodeResource(context.resources, R.drawable
                        .ic_launcher_background)).setContentIntent(pendingIntent)
            }else{
                val contentView = RemoteViews(context.packageName, R.layout.activity_after_notification)
                builder = Notification.Builder(context)
                    .setContent(contentView)
                    .setSmallIcon(R.drawable.ic_launcher_foreground)
                    .setLargeIcon(BitmapFactory.decodeResource(context.resources, R.drawable.ic_launcher_foreground))
                    .setContentIntent(pendingIntent)
            }

            notificationManager.notify((1000..10000).random(), builder.build())
        }catch (e : Exception){
            val stacktrace = StringWriter().also { e.printStackTrace(PrintWriter(it)) }.toString().trim()
            println("Exception caught: $stacktrace")
        }


    }
}