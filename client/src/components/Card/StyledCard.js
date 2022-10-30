import styled from "styled-components";
import { useGameStore } from "../../utils/store";

const StyledCard = styled.div`
  .card {
    width: 1fr;
    height: 1fr;
    aspect-ratio: 1;
  }

  .c {
    cursor: pointer;
    will-change: transform, opacity;
  }

  .front,
  .back {
    background-size: cover;
    position: absolute;
    border-radius: 5px;
    width: 100%;
    height: 100%;
    margin: 1px;
  }

  .front {
    background-image: url("https://images.unsplash.com/photo-1540206395-68808572332f?ixlib=rb-1.2.1&w=1181&q=80&auto=format&fit=crop");
  }
`;

export default StyledCard;
