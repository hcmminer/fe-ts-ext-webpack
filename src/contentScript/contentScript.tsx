// TODO: content script
import React from "react";
import ReactDOM from "react-dom";
import "../static/global.css";
import { FloatingButton } from "../components/FloatingButton";
import { TranslationBox } from "../components/TranslationBox";
import { Button } from "../components/ui/button"; // Import ShadCN button

const root1 = document.createElement("div");
const root2 = document.createElement("div");
const root3 = document.createElement("div"); // Tạo thêm một root để render nút ShadCN
document.body.appendChild(root1);
document.body.appendChild(root2);
document.body.appendChild(root3);

ReactDOM.render(<FloatingButton />, root1); // Render FloatingButton vào root1
ReactDOM.render(<TranslationBox />, root2); // Render TranslationBox vào root2
ReactDOM.render(
    <div style={{ position: "fixed", top: "50px", right: "50px", zIndex: 9999 }}>
        <Button variant="destructive">Destructive</Button>
    </div>,
    root3
); // Render nút ShadCN vào root3
