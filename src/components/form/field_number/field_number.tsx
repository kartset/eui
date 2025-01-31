/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { InputHTMLAttributes, Ref, FunctionComponent } from 'react';
import { CommonProps } from '../../common';
import classNames from 'classnames';

import {
  EuiFormControlLayout,
  EuiFormControlLayoutProps,
} from '../form_control_layout';

import { EuiValidatableControl } from '../validatable_control';

import { IconType } from '../../icon';
import { useFormContext } from '../eui_form_context';
import { getFormControlClassNameForIconCount } from '../form_control_layout/_num_icons';

export type EuiFieldNumberProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'min' | 'max' | 'readOnly' | 'step'
> &
  CommonProps & {
    icon?: IconType;
    isInvalid?: boolean;
    /**
     * Expand to fill 100% of the parent.
     * Defaults to `fullWidth` prop of `<EuiForm>`.
     * @default false
     */
    fullWidth?: boolean;
    /**
     * @default false
     */
    isLoading?: boolean;
    readOnly?: boolean;
    min?: number;
    max?: number;
    /**
     * Specifies the granularity that the value must adhere to.
     * Accepts a `number` or the string `'any'` for no stepping to allow for any value.
     * Defaults to `1`
     */
    step?: number | 'any';
    inputRef?: Ref<HTMLInputElement>;

    /**
     * Creates an input group with element(s) coming before input.
     * `string` | `ReactElement` or an array of these
     */
    prepend?: EuiFormControlLayoutProps['prepend'];

    /**
     * Creates an input group with element(s) coming after input.
     * `string` | `ReactElement` or an array of these
     */
    append?: EuiFormControlLayoutProps['append'];

    /**
     * Completely removes form control layout wrapper and ignores
     * icon, prepend, and append. Best used inside EuiFormControlLayoutDelimited.
     */
    controlOnly?: boolean;

    /**
     * when `true` creates a shorter height input
     * @default false
     */
    compressed?: boolean;
  };

export const EuiFieldNumber: FunctionComponent<EuiFieldNumberProps> = (
  props
) => {
  const { defaultFullWidth } = useFormContext();
  const {
    className,
    icon,
    id,
    placeholder,
    name,
    min,
    max,
    value,
    isInvalid,
    fullWidth = defaultFullWidth,
    isLoading = false,
    compressed = false,
    prepend,
    append,
    inputRef,
    readOnly,
    controlOnly,
    ...rest
  } = props;

  const numIconsClass = getFormControlClassNameForIconCount({
    isInvalid,
    isLoading,
  });

  const classes = classNames('euiFieldNumber', className, numIconsClass, {
    'euiFieldNumber--withIcon': icon,
    'euiFieldNumber--fullWidth': fullWidth,
    'euiFieldNumber--compressed': compressed,
    'euiFieldNumber--inGroup': prepend || append,
    'euiFieldNumber-isLoading': isLoading,
  });

  const control = (
    <EuiValidatableControl isInvalid={isInvalid}>
      <input
        type="number"
        id={id}
        min={min}
        max={max}
        name={name}
        value={value}
        placeholder={placeholder}
        readOnly={readOnly}
        className={classes}
        ref={inputRef}
        {...rest}
      />
    </EuiValidatableControl>
  );

  if (controlOnly) {
    return control;
  }

  return (
    <EuiFormControlLayout
      icon={icon}
      fullWidth={fullWidth}
      isLoading={isLoading}
      isInvalid={isInvalid}
      compressed={compressed}
      readOnly={readOnly}
      prepend={prepend}
      append={append}
      inputId={id}
    >
      {control}
    </EuiFormControlLayout>
  );
};
