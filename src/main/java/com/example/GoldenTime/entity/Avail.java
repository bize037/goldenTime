package com.example.GoldenTime.entity;

import lombok.*;

import javax.persistence.*;

@Entity(name = "hosp_avail_tb")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
@ToString
public class Avail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_CD")
    private Integer idx;
    @Column(name = "local_ST")
    private String local;
    @Column(name = "city_ST")
    private String city;
    @Column(name = "dutyname_ST")
    private String dutyname;
    @Column(name = "hpid_ST")
    private String hpid;
    @Column(name = "dutytel3_ST")
    private String dutytel;
    @Column(name = "hvidate_ST")
    private String hvidate;

    @Column(name = "hvec_ST")
    private String hvec;
    @Column(name = "hvgc_ST")
    private String hvgc;
    @Column(name = "hvctayn_ST")
    private String hvctayn;
    @Column(name = "hvmriayn_ST")
    private String hvmriayn;
    @Column(name = "hv28_ST")
    private String hv28;
    @Column(name = "hv27_ST")
    private String hv27;
    @Column(name = "hv29_ST")
    private String hv29;
    @Column(name = "hv30_ST")
    private String hv30;

    @Column(name = "hvcc_ST")
    private String hvcc;
    @Column(name = "hvncc_ST")
    private String hvncc;
    @Column(name = "hvccc_ST")
    private String hvccc;
    @Column(name = "hvicc_ST")
    private String hvicc;

    @Column(name = "hv2_ST")
    private String hv2;
    @Column(name = "hv3_ST")
    private String hv3;
    @Column(name = "hv6_ST")
    private String hv6;
    @Column(name = "hv7_ST")
    private String hv7;
    @Column(name = "hv8_ST")
    private String hv8;
    @Column(name = "hv9_ST")
    private String hv9;
    @Column(name = "hvoc_ST")
    private String hvoc;

}
