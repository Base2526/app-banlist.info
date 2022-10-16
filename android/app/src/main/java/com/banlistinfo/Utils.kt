package com.banlistinfo

import android.app.ActivityManager
import android.app.ActivityManager.RunningAppProcessInfo
import android.content.Context
import android.os.Build
import android.util.Log
import bolts.Task.delay
import com.apollographql.apollo3.ApolloCall
import com.apollographql.apollo3.ApolloClient
import com.apollographql.apollo3.network.ws.SubscriptionWsProtocol
import com.apollographql.apollo3.network.ws.WebSocketNetworkTransport
import com.example.LaunchesQuery
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking


open class Utils {
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
                    apolloClient(context).query(LaunchesQuery()).execute()
                } catch (e: Exception) {
                    println("")
                    null
                }

                println(response?.data)
                println("")
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
}