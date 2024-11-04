"use client";
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import Swal from "sweetalert2";
import { worldData } from "./worldData";
import worldGeoData from "./worldGeoJson.json";

const GeoData = () => {
    const mapRef = useRef(null);

    useEffect(() => {
        drawMap();
    }, []);

    const getColor = (accounts) => {
        if (accounts > 100) return "#4AB08D";
        if (accounts > 50) return "#F5AE68";
        if (accounts > 10) return "#FAE1EB";
        if (accounts > 0) return "#DEE1E6";
        return "#DEE1E6";
    };

    const drawMap = () => {
        const width = 1200;
        const height = 800;

        const svg = d3.select(mapRef.current)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .call(
                d3.zoom()
                    .scaleExtent([1, 8])
                    .on("zoom", (event) => {
                        svg.attr("transform", event.transform);
                    })
            )
            .append("g");

        const projection = d3.geoMercator()
            .scale(width / 3)
            .translate([width / 2, height / 1.4]);

        const path = d3.geoPath().projection(projection);

        svg.selectAll("path")
            .data(worldGeoData.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("fill", (d) => {
                const country = worldData.find(c => c.countryCode === d.properties.ISO_A2);
                const accounts = country ? country.accounts : 0;
                return getColor(accounts);
            })
            .attr("stroke", "#ffffff")
            .attr("stroke-width", 1.5)
            .on("click", (event, d) => {
                const country = worldData.find(c => c.countryCode === d.properties.ISO_A2);
                const accounts = country ? country.accounts : 0;

                Swal.fire(
                    `${d.properties.ADMIN || "undefined"}`,
                    `帳號數量: ${accounts}`,
                    "info"
                );
            });


        svg.selectAll("text")
            .data(worldGeoData.features)
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
                const country = worldData.find(c => c.countryCode === d.properties.ISO_A2);
                const accounts = country ? country.accounts : 0;
                return accounts > 0 ? accounts : "";
            });
    };

    return (
        <div className="exhibitionBackend">
            <div className="exhibitionBackend__container">
                <div className="exhibitionBackend__contentWrapper">
                    <h1 className="exhibitionBackend__contentWrapper__title">
                        數據管理
                    </h1>
                    <div ref={mapRef} className="mapContainer"></div>
                </div>
            </div>
        </div>
    );
};

export default GeoData;
