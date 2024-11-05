"use client";
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import Swal from "sweetalert2";
import { API_GetMemberCountByCountryWithCompany } from "@/api/api";
import Loading from "@/(reservation)/exhibition/components/Loading/Loading";

const MapAccount = () => {
    const mapRef = useRef(null);
    const [memberData, setMemberData] = useState([]);
    const [geoData, setGeoData] = useState(null);

    useEffect(() => {
        API_GetMemberCountByCountryWithCompany()
            .then(response => {
                setMemberData(response.message);
                console.log("Member count data loaded:", response.message);
            })
            .catch(error => {
                console.error("Error loading member count data:", error);
            });

        fetch("https://cdk-hnb659fds-assets-637423257201-ap-southeast-2.s3.ap-southeast-2.amazonaws.com/worldGeoJson.json")
            .then(response => response.json())
            .then(data => {
                setGeoData(data);
                console.log("GeoJSON data loaded:", data);
            })
            .catch(error => {
                console.error("Error loading GeoJSON data:", error);
            });
    }, []);

    // 在 geoData 和 memberData 載入完成後再繪製地圖
    useEffect(() => {
        if (geoData && memberData.length > 0) {
            drawMap(geoData);
        }
    }, [geoData, memberData]);

    const getColor = (accounts) => {
        if (accounts > 100) return "#4AB08D";
        if (accounts > 50) return "#F5AE68";
        if (accounts > 10) return "#FAE1EB";
        if (accounts > 0) return "#DEF3FF";
        return "#DEE1E6";
    };

    const drawMap = (geoData) => {
        const width = 1000;
        const height = 800;

        const svg = d3.select(mapRef.current)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .call(
                d3.zoom()
                    .scaleExtent([0.4, 8])
                    .on("zoom", (event) => {
                        svg.attr("transform", event.transform);
                    })
            )
            .append("g");

        const projection = d3.geoMercator()
            .center([121.5, 25.0]) // 台灣的經緯度
            .scale(1500)
            .translate([width / 2, height / 2]);

        const path = d3.geoPath().projection(projection);

        svg.selectAll("path")
            .data(geoData.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("fill", (d) => {
                const country = memberData.find(c => c.countryCode === d.properties.ISO_A2);
                const accounts = country ? country.memberCount : 0;
                return getColor(accounts);
            })
            .attr("stroke", "#ffffff")
            .attr("stroke-width", 1.5)
            .on("click", (event, d) => {
                const country = memberData.find(c => c.countryCode === d.properties.ISO_A2);
                const accounts = country ? country.memberCount : 0;
                const countryName = country ? country.countryNameEn : "undefined";

                Swal.fire(
                    `${countryName}`,
                    `帳號數量: ${accounts}`,
                    "info"
                );
            });

        svg.selectAll("text")
            .data(geoData.features)
            .enter()
            .append("text")
            .attr("transform", (d) => {
                const [x, y] = path.centroid(d);
                return `translate(${x}, ${y})`;
            })
            .attr("dy", "0.35em")
            .attr("font-size", "10px")
            .attr("text-anchor", "middle")
            .attr("fill", "#000")
            .text((d) => {
                const country = memberData.find(c => c.countryCode === d.properties.ISO_A2);
                const accounts = country ? country.memberCount : 0;
                return accounts > 0 ? accounts : "";
            });

    };

    return (
        <div className="mapContainer">
            <div ref={mapRef}></div>
        </div>
    );
};

export default MapAccount;
