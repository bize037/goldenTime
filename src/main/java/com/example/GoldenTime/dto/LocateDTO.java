package com.example.GoldenTime.dto;

import com.example.GoldenTime.entity.Locate;
import lombok.*;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class LocateDTO {
    private Integer idx;
    private String local;
    private String city;
    private String hpid;
    private String dutytel;
    private String dutyaddr;
    private String dutyname;
    private String wgslat;
    private String wgslon;

    private String mons;
    private String mone;
    private String tues;
    private String tuee;
    private String weds;
    private String wede;
    private String thus;
    private String thue;
    private String fris;
    private String frie;
    private String sats;
    private String sate;
    private String suns;
    private String sune;
    private String holis;
    private String holie;

    public Locate LocateEntity() {
        return new Locate(idx, local, city, hpid, dutytel, dutyaddr, dutyname, wgslat, wgslon, mons, mone, tues, tuee, weds, wede, thus, thue, fris, frie, sats, sate, suns, sune, holis, holie);
    }

    @Builder
    public LocateDTO(Integer idx, String local, String city, String hpid, String dutytel, String dutyaddr, String dutyname, String wgslat, String wgslon, String mons, String mone, String tues, String tuee, String weds, String wede, String thus, String thue, String fris, String frie, String sats, String sate, String suns, String sune, String holis, String holie) {
        this.idx = idx;
        this.local = local;
        this.city = city;
        this.hpid = hpid;
        this.dutytel = dutytel;
        this.dutyaddr = dutyaddr;
        this.dutyname = dutyname;
        this.wgslat = wgslat;
        this.wgslon = wgslon;
        this.mons = mons;
        this.mone = mone;
        this.tues = tues;
        this.tuee = tuee;
        this.weds = weds;
        this.wede = wede;
        this.thus = thus;
        this.thue = thue;
        this.fris = fris;
        this.frie = frie;
        this.sats = sats;
        this.sate = sate;
        this.suns = suns;
        this.sune = sune;
        this.holis = holis;
        this.holie = holie;
    }
}
