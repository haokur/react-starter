import React from 'react'

import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import Button from "../src/components/Button";

describe.skip("<Button />", () => {
    test("should render ready2", () => {
        render(<Button buttonText="Click Me" />);
    });

    // test("should have a button", () => {
    //     const button = screen.queryByRole("button");
    // });

    // test("should have a solid heart if the user clicks on the heart button", async () => {
    //     const button = screen.getByRole("button");

    //     await userEvent.click(button);

    //     expect(screen.getByText('Button clicked!2')).toBeInTheDocument();
    // });

})