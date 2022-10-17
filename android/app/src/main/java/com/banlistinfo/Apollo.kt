@file:JvmName("Apollo")

package com.banlistinfo

import android.content.Context
import com.apollographql.apollo3.ApolloClient
import com.apollographql.apollo3.network.okHttpClient
import okhttp3.Interceptor
import okhttp3.OkHttpClient
import okhttp3.Response



private var instance: ApolloClient? = null

fun apolloClient(context: Context): ApolloClient {
    if (instance != null) {
        return instance!!
    }

    val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(AuthorizationInterceptor(context))
        .build()

    instance = ApolloClient.Builder()
            .serverUrl("http://157.245.51.177:4000/graphql")
//        .serverUrl("https://banlist.info/graphql")
//        .webSocketServerUrl("wss://banlist.info/graphql")
        .okHttpClient(okHttpClient)
        .build()

//    instance = ApolloClient.Builder()
//        .serverUrl("https://banlist.info/graphql")
//        .build()

    return instance!!
}

private class AuthorizationInterceptor(val context: Context) : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        val request = chain.request().newBuilder()
            .addHeader("Authorization", "xxx")
            .build()

        return chain.proceed(request)
    }
}
