import React from 'react'
import { Link } from "react-router-dom";
 import "./Nav.css";
// import Button from "@material-ui/core/Button";

const Nav = () => {
  return (
    <div>
         <div className="TopArea">
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "0vh",
                        padding: "3%", 
                    }}
                >
                    <div style={{ marginLeft: "2vw" }}>
                        <strong style={{ fontSize: "1.8rem" }}>Natwest</strong>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-around"
                        }}
                    >
                        <a className="underLine2  "href="/">
                            <button>
                                Assignment-1 
                            </button>
                        </a>
                        <a className="underLine2  " href="/state">
                            <button>
                            Assignment-2 
                            </button>
                        </a>

                    </div>
                </div>
            </div>
      
    </div>
  )
}

export default Nav
