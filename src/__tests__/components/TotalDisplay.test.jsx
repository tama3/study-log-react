import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TotalDisplay } from "../../components/TotalDisplay";

describe("TotalDisplay", () => {
    test("合計時間がラベルとともに表示される", () => {
        render(<TotalDisplay totalTime={100} />);
        expect(screen.getByText("合計時間")).toBeInTheDocument();
        expect(screen.getByText("100")).toBeInTheDocument();
        expect(screen.getByText("/1000(h)")).toBeInTheDocument();
    });
});
