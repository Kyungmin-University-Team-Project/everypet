package com.everypet.global.util.point.model.constant;

public enum PointType {

    SIGN_UP("신규회원", "회원가입 축하 보너스 포인트"),
    REFERRAL("추천인", "추천인 보너스 포인트");

    private final String type;
    private final String description;

    PointType(String type, String description) {
        this.type = type;
        this.description = description;
    }

    public String getType() {
        return type;
    }

    public String getDescription() {
        return description;
    }
}
