"use client";
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { API_GetMemberCreatedCountEveryday } from "@/api/api";

const BarChart = () => {
    const chartRef = useRef(null);
    const [memberData, setMemberData] = useState([]);

    useEffect(() => {
        API_GetMemberCreatedCountEveryday()
            .then(response => {
                const formattedData = response.map(item => ({
                    date: new Date(item.date),
                    createdMemberCount: item.createdMemberCount || 0
                }));
                setMemberData(formattedData);
                console.log("Member count data loaded:", formattedData);
            })
            .catch(error => {
                console.error("Error loading member count data:", error);
            });
    }, []);

    useEffect(() => {
        if (memberData.length === 0) return;

        const width = 2000;
        const height = 600;
        const margin = { top: 20, right: 30, bottom: 120, left: 80 };

        d3.select(chartRef.current).select("svg").remove();

        const svg = d3.select(chartRef.current)
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        const x = d3.scaleBand()
            .domain(memberData.map(d => d.date))
            .range([margin.left, width - margin.right])
            .padding(0.4);

        const y = d3.scaleLinear()
            .domain([0, d3.max(memberData, d => d.createdMemberCount)])
            .nice()
            .range([height - margin.bottom, margin.top]);

        svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x)
                .tickFormat(d3.timeFormat("%Y/%m/%d"))
                .ticks(10))
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("transform", "rotate(-45)")
            .attr("dy", "1em");

        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y).ticks(10));

        svg.append("g")
            .selectAll("rect")
            .data(memberData)
            .enter()
            .append("rect")
            .attr("x", d => x(d.date))
            .attr("y", d => y(d.createdMemberCount))
            .attr("width", x.bandwidth())
            .attr("height", d => height - margin.bottom - y(d.createdMemberCount))
            .attr("fill", "#BCE0F4");

        svg.append("text")
            .attr("x", -(height / 2))
            .attr("y", margin.left / 2)
            .attr("transform", "rotate(-90)")
            .attr("text-anchor", "middle")
            .text("每日新增會員數");

        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height - 10)
            .attr("text-anchor", "middle")
            .text("日期");
    }, [memberData]);

    return (
        <div style={{ overflowX: "auto" }}>
            <div ref={chartRef}></div>
        </div>
    );
};

export default BarChart;
