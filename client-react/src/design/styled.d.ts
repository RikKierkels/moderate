import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    readonly spacing: Spacing;
    readonly breakpoint: Breakpoint;
    readonly fontSize: FontSize;
    readonly color: Color;
  }
}

interface Spacing {
  readonly xs: string;
  readonly sm: string;
  readonly md: string;
  readonly lg: string;
  readonly xlg: string;
}

interface Breakpoint {
  readonly small: string;
  readonly medium: string;
}

interface FontSize {
  readonly xs: string;
  readonly sm: string;
  readonly md: string;
  readonly lg: string;
  readonly xlg: string;
}

interface Color {
  readonly title: string;
  readonly font: string;
  readonly body: string;
}
