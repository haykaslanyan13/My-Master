import React, { useState } from "react";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import AdminHomePage from "./AdminHomePage";
import AdminPageMasters from "./AdminPageMasters";
import AdminPageServices from "./AdminPageServices";

function Admin() {
  const { MastersOrServices } = useParams();
  const navigate = useNavigate();
  return (
    <div>
      <div
        className="Menu"
        style={{
          width: "100%",
          backgroundColor: "#000012",
          height: 80,
        }}>
        <h1
          style={{
            margin: 0,
            padding: 15,
            marginLeft: 30,
          }}>
          <span
            onClick={() => navigate("/Admin")}
            style={{ color: "#007ce7", fontSize: "30px", cursor: "pointer" }}>
            Admin Page
          </span>
        </h1>
      </div>
      <div style={{ display: "flex" }}>
        <div
          className="servicesOrMasters"
          style={{
            width: "13vw",
            backgroundColor: "#000019",
            height: "calc(100vh - 80px)",
          }}>
          <div
            style={{
              height: 55,
              borderBottom: "solid",
              borderTop: "solid",
              borderColor: "#000035",
              cursor: "pointer",
            }}>
            {" "}
            <h2
              style={{
                margin: 0,
                padding: 10,
                marginLeft: 30,
              }}>
              <Link
                style={{ textDecoration: "none", color: "#007ce7" }}
                to="services">
                Services
              </Link>
            </h2>
          </div>
          <div
            style={{
              height: 55,
              borderBottom: "solid",
              cursor: "pointer",
              borderColor: "#000035",
            }}>
            <h2
              style={{
                margin: 0,
                padding: 10,
                marginLeft: 30,
              }}>
              <Link
                style={{ textDecoration: "none", color: "#007ce7" }}
                to="masters">
                Masters
              </Link>
            </h2>
          </div>
        </div>
        {MastersOrServices === "services" ? <AdminPageServices /> : null}
        {MastersOrServices === "masters" ? <AdminPageMasters /> : null}
        {!MastersOrServices && <AdminHomePage />}
      </div>
    </div>
  );
}

export default Admin;
