import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Hero from "../components/hero/Hero";

describe("Hero Tests", () => {

  it("should render hero banner and hero message", () => {

    render(<Hero/>);

    expect(screen.getByText("Stop in and test drive your new car today")).toBeInTheDocument();
    expect(screen.getByText("S-G")).toBeInTheDocument();
    expect(screen.getByText("Auto Sales")).toBeInTheDocument();

  })
})