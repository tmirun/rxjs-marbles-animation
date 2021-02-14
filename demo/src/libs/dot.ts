import { G, Svg } from '@svgdotjs/svg.js';
import tippy from 'tippy.js';
import { RxAxisType } from './rx-axis';
import 'tippy.js/dist/tippy.css';
import { isObservable } from 'rxjs';

interface Options {
  value: any;
  cy: number;
  cx: number;
  color: string;
  rxAxisType: RxAxisType;
}

export const RX_DOT_SIZE = 30;
export const RX_DOT_RADIUS = RX_DOT_SIZE / 2;
export const RX_DOT_STROKE = 4;
export const RX_DOT_RADIUS_OUTER = RX_DOT_RADIUS + RX_DOT_STROKE;

export function drawDot(draw: Svg | G, { value, cx, cy, color }: Options) {
  let label = '';

  const dot = draw.group();

  if (isObservable(value)) {
    dot
      .circle()
      .center(0, 0)
      .fill('rgba(255,255,255, 0.5)')
      .animate()
      .size(RX_DOT_SIZE, RX_DOT_SIZE);
    label = 'new observable';
  } else {
    label = value.toString();
    const text = label.length > 3 ? '...' : label;
    dot
      .circle(0)
      .center(0, 0)
      .fill('rgba(255, 255, 255, 0.8)')
      .stroke({ color: color, width: RX_DOT_STROKE })
      .animate()
      .size(RX_DOT_SIZE, RX_DOT_SIZE);

    dot.text(text).center(0, 0).attr({ fill: '#000' }).attr({
      style: 'user-select: none; cursor: default; outline: none'
    });
  }

  tippy([dot.node], {
    content: label,
    placement: 'top'
  });

  dot.opacity(0).animate().attr({ opacity: 1 });

  dot.transform({
    translateX: cx,
    translateY: cy
  });

  return dot;
}
