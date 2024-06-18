package com.example.GoldenTime.entity;

import lombok.*;

import javax.persistence.*;

@Entity(name = "hosp_locate_tb")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
@ToString
public class Locate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_CD")
    private Integer idx;
    @Column(name = "local_ST")
    private String local;
    @Column(name = "city_ST")
    private String city;
    @Column(name = "hpid_ST")
    private String hpid;
    @Column(name = "dutyTel3_ST")
    private String dutytel;
    @Column(name = "dutyaddr_ST")
    private String dutyaddr;
    @Column(name = "dutyname_ST")
    private String dutyname;
    @Column(name = "wgs84lat_ST")
    private String wgslat;
    @Column(name = "wgs84lon_ST")
    private String wgslon;

    @Column(name = "monS_ST")
    private String mons;
    @Column(name = "monE_ST")
    private String mone;
    @Column(name = "tueS_ST")
    private String tues;
    @Column(name = "tueE_ST")
    private String tuee;
    @Column(name = "wedS_ST")
    private String weds;
    @Column(name = "wedE_ST")
    private String wede;
    @Column(name = "thuS_ST")
    private String thus;
    @Column(name = "thuE_ST")
    private String thue;
    @Column(name = "friS_ST")
    private String fris;
    @Column(name = "friE_ST")
    private String frie;
    @Column(name = "satS_ST")
    private String sats;
    @Column(name = "satE_ST")
    private String sate;
    @Column(name = "sunS_ST")
    private String suns;
    @Column(name = "sunE_ST")
    private String sune;
    @Column(name = "holiS_ST")
    private String holis;
    @Column(name = "holiE_ST")
    private String holie;
}

