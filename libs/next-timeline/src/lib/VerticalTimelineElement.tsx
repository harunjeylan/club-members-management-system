import React, { CSSProperties, ReactNode } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { InView } from 'react-intersection-observer';
import './VerticalTimelineElement.css'
type PropTypes = {
  children?: any;
  className?: string;
  contentArrowStyle?: CSSProperties;
  contentStyle?: CSSProperties;
  date: string;
  dateClassName?: string;
  icon?: any;
  iconClassName?: string;
  iconOnClick?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  onTimelineElementClick?: (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => void;
  iconStyle?: CSSProperties;
  id?: string;
  position?: string;
  style?: CSSProperties;
  contentClassName?: string;
  intersectionObserverProps?: {
    rootMargin?: string;
    triggerOnce?: boolean;
  };
  visible?: boolean;
  shadowSize?: 'small' | 'medium' | 'large';
};
export const VerticalTimelineElement = ({
  children = '',
  className = '',
  contentArrowStyle,
  contentStyle,
  date = '',
  dateClassName = '',
  icon,
  iconClassName = '',
  iconOnClick,
  onTimelineElementClick,
  iconStyle,
  id = '',
  position = '',
  style,
  contentClassName = '',
  intersectionObserverProps = {
    rootMargin: '0px 0px -40px 0px',
    triggerOnce: true,
  },
  visible = false,
  shadowSize = 'small', 
}: PropTypes) => (
  <InView {...intersectionObserverProps}>
    {({ inView, ref }) => (
      <div
        ref={ref}
        id={id}
        className={classNames(className, 'vertical-timeline-element', {
          'vertical-timeline-element--left': position === 'left',
          'vertical-timeline-element--right': position === 'right',
          'vertical-timeline-element--no-children': children === '',
        })}
        style={style}
      >
        <React.Fragment>
          <span // eslint-disable-line jsx-a11y/no-static-element-interactions
            style={iconStyle}
            onClick={iconOnClick}
            className={classNames(
              iconClassName,
              'vertical-timeline-element-icon',
              `shadow-size-${shadowSize}`, // for shadow size
              {
                'bounce-in': inView || visible,
                'is-hidden': !(inView || visible),
              }
            )}
          >
            {icon}
          </span>
          <div
            style={contentStyle}
            onClick={onTimelineElementClick}
            className={classNames(
              contentClassName,
              'vertical-timeline-element-content',
              {
                'bounce-in': inView || visible,
                'is-hidden': !(inView || visible),
              }
            )}
          >
            <div
              style={contentArrowStyle}
              className="vertical-timeline-element-content-arrow"
            />
            {children}
            <span
              className={classNames(
                dateClassName,
                'vertical-timeline-element-date'
              )}
            >
              {date}
            </span>
          </div>
        </React.Fragment>
      </div>
    )}
  </InView>
);
