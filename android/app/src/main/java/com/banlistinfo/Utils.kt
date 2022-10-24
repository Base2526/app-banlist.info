package com.banlistinfo

import android.annotation.SuppressLint
import android.app.*
import android.app.ActivityManager.RunningAppProcessInfo
import android.content.ContentResolver
import android.content.Context
import android.content.Intent
import android.database.Cursor
import android.database.Cursor.FIELD_TYPE_INTEGER
import android.database.Cursor.FIELD_TYPE_STRING
import android.graphics.BitmapFactory
import android.graphics.Color
import android.net.Uri
import android.os.Build
import android.provider.CallLog
import android.provider.ContactsContract
import android.provider.ContactsContract.Contacts
import android.provider.Telephony
import android.telephony.TelephonyManager
import android.util.Log
import android.widget.RemoteViews
import com.example.SearchMutation
import kotlinx.coroutines.runBlocking
import java.io.PrintWriter
import java.io.StringWriter

class Utils {
    fun isAppIsInBackground(context: Context): Boolean {
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

    fun killCall(context: Context): Boolean {
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

    fun test_apollo(context: Context): Boolean {

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
    fun local_noti(context: Context){
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

//            val intent = Intent(context, afterNotification::class.java)
            val intent = Intent(
                Intent.ACTION_VIEW, Uri.parse("banlistapp://")
            )
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
//            context.startActivity(i)

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

    fun unique(length: Int = 20): String{
        val allowedChars = ('A'..'Z') + ('a'..'z') + ('0'..'9')
        return (1..length).map { allowedChars.random() }.joinToString("")
     }

    fun cursorToArray(cursor: Cursor): Array<Array<String>> {
        val getColumnsCount :Int = cursor.columnCount
        var cursorArray :Array<Array<String>> = arrayOf<Array<String>>()
        var columns :Array<String> =  arrayOf<String>()
        var indexes = 0
        cursor.count
        if(cursor.count != 0){
            if(cursor.count == 1){
                cursor.moveToFirst()
                for (i in 0 until getColumnsCount step 1){
                    try {
                        val list: MutableList<String> = columns.toMutableList()
                        list.add(cursor.getString(i))
                        columns = list.toTypedArray()
                    }catch (e : Exception){
                        println()
                    }

                }
                val list: MutableList<Array<String>> = cursorArray.toMutableList()
                list.add(columns)
                cursorArray = list.toTypedArray()
            }else{
                while (cursor.moveToNext()){
                    for (i in 0 until getColumnsCount step 1){
                        try {
                            val list: MutableList<String> = columns.toMutableList()
                            list.add(cursor.getString(i))
                            columns = list.toTypedArray()
                        }catch (e : Exception){
                            println()
                        }

                    }
                    val list: MutableList<Array<String>> = cursorArray.toMutableList()
                    list.add(columns)
                    cursorArray = list.toTypedArray()
                    columns = arrayOf()
                    indexes++
                }
            }
        }
        return cursorArray
    }

    @SuppressLint("Range")
    // https://gist.github.com/srayhunter/47ab2816b01f0b00b79150150feb2eb2
    fun getContacts(context: Context) :ArrayList<ContactObj>{
        val contactObjs: ArrayList<ContactObj> = ArrayList()
        val DISPLAY_NAME =
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB) Contacts.DISPLAY_NAME_PRIMARY else Contacts.DISPLAY_NAME

        val FILTER = "$DISPLAY_NAME NOT LIKE '%@%'"

        val ORDER = String.format("%1\$s COLLATE NOCASE", DISPLAY_NAME)

        val PROJECTION = arrayOf(
            Contacts._ID,
            DISPLAY_NAME,
            Contacts.HAS_PHONE_NUMBER,
            Contacts.PHOTO_URI
        )

        try {
            val cr: ContentResolver = context.getContentResolver()
            val cursor = cr.query(
                Contacts.CONTENT_URI,
                PROJECTION,
                FILTER,
                null,
                ORDER
            )

            if (cursor != null) {
                cursorToArray(cursor)
            }
            if (cursor != null && cursor.moveToFirst()) {
                do {
                    // get the contact's information
                    val id = cursor.getString(cursor.getColumnIndex(Contacts._ID))
                    var name: String = ""
                    var hasPhone: Int = 0
                    var photo_uri: String = ""


                    if (cursor.getType(cursor?.getColumnIndex(DISPLAY_NAME)) == FIELD_TYPE_STRING) {
                        name = cursor?.getString(cursor?.getColumnIndex(DISPLAY_NAME));
                    }
                    if (cursor.getType(cursor?.getColumnIndex(Contacts.HAS_PHONE_NUMBER)) == FIELD_TYPE_INTEGER) {
                        hasPhone = cursor?.getInt(cursor?.getColumnIndex(Contacts.HAS_PHONE_NUMBER))
                    }

                    if (cursor.getType(cursor?.getColumnIndex(Contacts.PHOTO_URI)) == FIELD_TYPE_STRING) {
                        photo_uri = cursor?.getString(cursor?.getColumnIndex(Contacts.PHOTO_URI))
                        println()
                    }

//                    PHOTO_URI

                    // get the user's email address
                    var email: String = ""
                    val ce = cr.query(
                        ContactsContract.CommonDataKinds.Email.CONTENT_URI,
                        null,
                        ContactsContract.CommonDataKinds.Email.CONTACT_ID + " = ?",
                        arrayOf(id),
                        null
                    )
                    if (ce != null && ce.moveToFirst()) {
                        email =
                            ce.getString(ce.getColumnIndex(ContactsContract.CommonDataKinds.Email.DATA))
                        ce.close()
                    }

                    // get the user's phone number
                    var phone: String = ""
                    if (hasPhone > 0) {
                        val cp = cr.query(
                            ContactsContract.CommonDataKinds.Phone.CONTENT_URI,
                            null,
                            ContactsContract.CommonDataKinds.Phone.CONTACT_ID + " = ?",
                            arrayOf(id),
                            null
                        )
                        if (cp != null && cp.moveToFirst()) {
                            phone =
                                cp.getString(cp.getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER))
                            cp.close()
                        }
                    }

                    println("id : ${id}, name: ${name}, hasPhone: ${hasPhone}, email: ${email}, phone: ${phone}")

                    // if the user user has an email or phone then add it to contacts
//                    if ((!TextUtils.isEmpty(email) && Patterns.EMAIL_ADDRESS.matcher(email)
//                            .matches()
//                                && !email.equals(name, ignoreCase = true)) || !TextUtils.isEmpty(
//                            phone
//                        )
//                    ) {

                    val contactObj = ContactObj()
                    contactObj.id = id
                    contactObj.name = name
                    contactObj.hasPhone = hasPhone
                    contactObj.email = email
                    contactObj.phone = phone
                    contactObj.photo_uri = photo_uri;
                    contactObjs.add(contactObj)

//                    }
                } while (cursor.moveToNext())

                // clean up cursor
                cursor.close()
            }
//            contacts
        } catch (e: java.lang.Exception) {
            val stacktrace = StringWriter().also { e.printStackTrace(PrintWriter(it)) }.toString().trim()
            println("Exception caught: $stacktrace")
        }

        return contactObjs;
    }

    @SuppressLint("Range")
    fun test(context: Context): Boolean {
        try {



            val DISPLAY_NAME =
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB) Contacts.DISPLAY_NAME_PRIMARY else Contacts.DISPLAY_NAME

            var cols= arrayOf(
                Contacts._ID,
                DISPLAY_NAME,
                Contacts.HAS_PHONE_NUMBER)

            val FILTER = "$DISPLAY_NAME NOT LIKE '%ปลัด%'"

            var c= context?.contentResolver?.query(
                Contacts.CONTENT_URI, cols, null,null,
                null, null)

            if (c?.moveToFirst() == true) {
                do{
                    var id: String = ""
                    var name: String = ""
                    var hasPhone: Int = 0

                    if (c.getType(c?.getColumnIndex(Contacts._ID)) == FIELD_TYPE_STRING) {
                        id = c?.getString(c?.getColumnIndex(Contacts._ID))
                    }
                    if (c.getType(c?.getColumnIndex(DISPLAY_NAME)) == FIELD_TYPE_STRING) {
                        name = c?.getString(c?.getColumnIndex(DISPLAY_NAME));
                    }
                    if (c.getType(c?.getColumnIndex(Contacts.HAS_PHONE_NUMBER)) == FIELD_TYPE_INTEGER) {
                        hasPhone = c.getInt(c?.getColumnIndex(Contacts.HAS_PHONE_NUMBER))
                    }

                    println("id : ${id}, name: ${name}, hasPhone: ${hasPhone}")
                } while (c.moveToNext());
            }

            if (c != null) {
//                var mm = cursorToArray(c)
                println()
            }
        }catch (e :Exception){
            val stacktrace = StringWriter().also { e.printStackTrace(PrintWriter(it)) }.toString().trim()
            println("Exception caught: $stacktrace")
        }

        return false;
    }

    fun getCallLogs(context: Context): ArrayList<CallLogObj> {
        val lstCallLog: ArrayList<CallLogObj> = ArrayList()
        try {
//            var contact = getContacts(context)

            var cols= arrayOf(
                CallLog.Calls._ID,
                CallLog.Calls.NUMBER,
                CallLog.Calls.CACHED_NAME,
                CallLog.Calls.TYPE,
                CallLog.Calls.DURATION,
                CallLog.Calls.DATE)
            var c= context?.contentResolver?.query(
                CallLog.Calls.CONTENT_URI,cols,null,
                null, "${CallLog.Calls.DATE} DESC")

//            return rs?.let { cursorToArray(it) }

            val totalSMS = c?.count
            if (c?.moveToFirst() == true) {
                for (i in 0 until totalSMS!!) {
//                    var list: MutableList<String> = ArrayList()

                    var callObj = CallLogObj()
                    callObj.id = ""
                    callObj.number = ""
                    callObj.name = ""
                    callObj.type = ""
                    callObj.duration = ""
                    callObj.date = ""

                    if ( null != c?.getString(0)) {
                        callObj.id = c?.getString(0)
                    }

                    if ( null != c?.getString(1)) {
                        callObj.number =  c?.getString(1)
                    }

                    if ( null != c?.getString(2)) {
                        callObj.name = c?.getString(2)
                    }

                    if ( null != c?.getString(3)) {
                        callObj.type = c?.getString(3)
                    }

                    if ( null != c?.getString(4)) {
                        callObj.duration = c?.getString(4)
                    }

                    if ( null != c?.getString(5)) {
                        callObj.date =  c?.getString(5)
                    }

                    lstCallLog.add(callObj)

                    c?.moveToNext()
                }
            } else {
                throw RuntimeException("You have no Call")
            }
            c?.close()

        }catch (e : Exception){
            val stacktrace = StringWriter().also { e.printStackTrace(PrintWriter(it)) }.toString().trim()
            println("Exception caught: $stacktrace")

        }

        return lstCallLog
    }

    fun getSMS(context: Context): MutableList<SMSObj>? {
        val lstSms: MutableList<SMSObj> = ArrayList()
        try {
            val col = arrayOf(  Telephony.Sms.Inbox._ID,
                                Telephony.Sms.Inbox.ADDRESS,
                                Telephony.Sms.Inbox.TYPE,
                                Telephony.Sms.Inbox.SUBJECT,
                                Telephony.Sms.Inbox.BODY,
                                Telephony.Sms.Inbox.DATE,
                                Telephony.Sms.Inbox.DATE_SENT,
                                Telephony.Sms.Inbox.READ,
                                Telephony.Sms.Inbox.SEEN,
                                Telephony.Sms.Inbox.STATUS)
            val c = context?.getContentResolver().query(Telephony.Sms.Inbox.CONTENT_URI,
                                                        col,
                                                null,
                                             null,
                                                        Telephony.Sms.Inbox.DEFAULT_SORT_ORDER ) // Default sort order

            val totalSMS = c?.count
            if (c?.moveToFirst() == true) {
                for (i in 0 until totalSMS!!) {

                    val smsObj= SMSObj()
                    smsObj.id = ""
                    smsObj.address = ""
                    smsObj.type = ""
                    smsObj.subject = ""
                    smsObj.body = ""
                    smsObj.date = ""
                    smsObj.date_sent = ""
                    smsObj.read = ""
                    smsObj.seen = ""
                    smsObj.status = ""

                    if ( null != c?.getString(0)) {
                        smsObj.id = c?.getString(0)
                    }
                    if ( null != c?.getString(1)) {
                        smsObj.address = c?.getString(1)
                    }
                    if ( null != c?.getString(2)) {
                        smsObj.type = c?.getString(2)
                    }
                    if ( null != c?.getString(3)) {
                        smsObj.subject = c?.getString(3)
                    }
                    if ( null != c?.getString(4)) {
                        smsObj.body = c?.getString(4)
                    }
                    if ( null != c?.getString(5)) {
                        smsObj.date = c?.getString(5)
                    }
                    if ( null != c?.getString(6)) {
                        smsObj.date_sent = c?.getString(6)
                    }
                    if ( null != c?.getString(7)) {
                        smsObj.read = c?.getString(7)
                    }
                    if ( null != c?.getString(8)) {
                        smsObj.seen = c?.getString(8)
                    }
                    if ( null != c?.getString(9)) {
                        smsObj.status = c?.getString(9)
                    }

                    lstSms.add(smsObj)

                    c?.moveToNext()
                }
            } else {
                throw RuntimeException("You have no SMS in Inbox")
            }
            c?.close()
        }catch (e : Exception){
            val stacktrace = StringWriter().also { e.printStackTrace(PrintWriter(it)) }.toString().trim()
            println("Exception caught: $stacktrace")
        }
        return lstSms
    }
}