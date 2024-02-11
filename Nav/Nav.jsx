import React from 'react'
import { Link } from "react-router-dom";
 import "./Nav.css";
import Button from "@material-ui/core/Button";

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
                        <a className="underLine2  ">
                            <Button variant="text" color="default" href="/">
                                Assignment-1 
                            </Button>
                        </a>
                        <a className="underLine2  " href="/state">
                            <Button variant="text" color="default">
                            Assignment-2 
                            </Button>
                        </a>

                    </div>
                </div>
            </div>
      
    </div>
  )
}

export default Nav
