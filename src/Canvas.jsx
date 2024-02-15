import React from "react";
import "./style/main.scss";

export default class Canvas extends React.Component {
  componentWillUnmount() {
    this.setState({
      canvasSize: { canvasWidth: 800, canvasHeight: 600 },
    });
  }

  componentDidMount() {
    const { canvasWidth, canvasHeight } = this.state.canvasSize;
    this.canvasHex.width = canvasWidth;
    this.canvasHex.height = canvasHeight;
  }
  render() {
    return <canvas ref={(canvasHex) => (this.canvasHex = canvasHex)}></canvas>;
  }
}
