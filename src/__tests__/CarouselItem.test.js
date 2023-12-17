import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {CarouselItem} from "../components/carousel item/CarouselItem";

describe("CarouselItem Tests", () => {

  it("should render the image, title, miles, and price of the item passed to it", () => {

    const item = {
      src: 'test.com',
      price: '2020',
      miles: '102',
      title: 'car'
    };

    render(<CarouselItem item={item}/>);

    expect(screen.getByText("car")).toBeInTheDocument();
    expect(screen.getByText("Miles: 102 Price: $2020")).toBeInTheDocument();
    expect(screen.getByTestId("item-image")).toBeInTheDocument();
  })
})