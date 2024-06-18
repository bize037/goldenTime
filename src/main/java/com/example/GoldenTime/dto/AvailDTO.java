package com.example.GoldenTime.dto;

import com.example.GoldenTime.entity.Avail;
import lombok.*;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class AvailDTO {
    private Integer idx;
    private String local;
    private String city;
    private String dutyname;
    private String hpid;
    private String dutytel;
    private String hvidate;

    private String hvec;
    private String hvgc;
    private String hvctayn;
    private String hvmriayn;
    private String hv28;
    private String hv27;
    private String hv29;
    private String hv30;

    private String hvcc;
    private String hvncc;
    private String hvccc;
    private String hvicc;

    private String hv2;
    private String hv3;
    private String hv6;
    private String hv7;
    private String hv8;
    private String hv9;
    private String hvoc;

    public Avail AvailEntity() {
        return new Avail(idx, local, city, dutyname, hpid, dutytel, hvidate, hvec, hvgc, hvctayn, hvmriayn, hv28, hv27, hv29, hv30, hvcc, hvncc, hvccc, hvicc, hv2, hv3, hv6, hv7, hv8, hv9, hvoc);
    }

    @Builder
    public AvailDTO(Integer idx, String local, String city, String dutyname, String hpid, String dutytel, String hvidate, String hvec, String hvgc, String hvctayn, String hvmriayn, String hv28, String hv27, String hv29, String hv30, String hvcc, String hvncc, String hvccc, String hvicc, String hv2, String hv3, String hv6, String hv7, String hv8, String hv9, String hvoc) {
        this.idx = idx;
        this.local = local;
        this.city = city;
        this.dutyname = dutyname;
        this.hpid = hpid;
        this.dutytel = dutytel;
        this.hvidate = hvidate;
        this.hvec = hvec;
        this.hvgc = hvgc;
        this.hvctayn = hvctayn;
        this.hvmriayn = hvmriayn;
        this.hv28 = hv28;
        this.hv27 = hv27;
        this.hv29 = hv29;
        this.hv30 = hv30;
        this.hvcc = hvcc;
        this.hvncc = hvncc;
        this.hvccc = hvccc;
        this.hvicc = hvicc;
        this.hv2 = hv2;
        this.hv3 = hv3;
        this.hv6 = hv6;
        this.hv7 = hv7;
        this.hv8 = hv8;
        this.hv9 = hv9;
        this.hvoc = hvoc;
    }
}
