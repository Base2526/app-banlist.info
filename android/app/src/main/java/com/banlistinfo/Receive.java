package com.banlistinfo;

import java.util.Date;

enum ReceiveType {
    PHONE,
    SMS
}

public class Receive {
    private ReceiveType type;
    private String phoneNumber;
    private Date createdAt;
    private String messages;

    public String getMessages() {
        return messages;
    }

    public void setMessages(String messages) {
        this.messages = messages;
    }

    public ReceiveType getType() {
        return type;
    }

    public void setType(ReceiveType type) {
        this.type = type;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
