import { describe, test, expect, vi } from "vitest";
import { render, screen, } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import { InputForm } from "../../components/InputForm";

describe("InputForm", () => {
    test("初期値", () => {
        render(<InputForm onAddRecord={vi.fn()} />);
        expect(screen.getByRole("textbox")).toHaveValue("");
        expect(screen.getByRole("spinbutton")).toHaveValue(0);
    });

    test("バリデーション: 空で登録", async () => {
        const mockOnDelete = vi.fn();
        render(<InputForm onAddRecord={mockOnDelete} />);

        await userEvent.click(screen.getByText('登録'));

        expect(screen.getByText("入力されていない項目があります。")).toBeInTheDocument();
        expect(mockOnDelete).not.toHaveBeenCalled();
    });

    test("正常系: 登録処理、登録後の初期値", async () => {
        const mockOnAdd = vi.fn();
        render(<InputForm onAddRecord={mockOnAdd} />);

        await userEvent.type(screen.getByRole("textbox"), "React");
        await userEvent.clear(screen.getByRole("spinbutton"));
        await userEvent.type(screen.getByRole("spinbutton"), "3");
        await userEvent.click(screen.getByText("登録"));

        expect(mockOnAdd).toHaveBeenCalledWith("React", 3);
        expect(screen.getByRole("textbox")).toHaveValue("");
        expect(screen.getByRole("spinbutton")).toHaveValue(0);
    })
});