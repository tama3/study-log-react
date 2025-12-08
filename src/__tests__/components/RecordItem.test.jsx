import { describe, test, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { RecordItem } from "../../components/RecordItem";

describe("RecordItem", () => {

    test("タイトルと時間が表示される", () => {
        const title = "React学習";
        const time = "3";
        const mockOnDelete = vi.fn();
        render(<RecordItem title={title} time={time} onDelete={mockOnDelete} />);

        expect(screen.getByText(`${title} ${time}時間`)).toBeInTheDocument();
    });

    test("削除ボタンが表示される", () => {
        const title = "React学習";
        const time = "3";
        const mockOnDelete = vi.fn();
        render(<RecordItem title={title} time={time} onDelete={mockOnDelete} />);

        const delButton = screen.getByRole("button", { name: "削除" });
        expect(delButton).toBeInTheDocument();
    });

    test("削除ボタンをクリックするとonDeleteが呼ばれる", () => {
        const title = "React学習";
        const time = "3";
        const mockOnDelete = vi.fn();
        render(<RecordItem title={title} time={time} onDelete={mockOnDelete} />);

        const delButton = screen.getByRole("button", { name: "削除" });
        fireEvent.click(delButton);

        expect(mockOnDelete).toBeCalled();
    });

});
