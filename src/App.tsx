import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { DocsIndex } from './docs/DocsIndex'
import { DocsLayout } from './docs/DocsLayout'
import { GettingStartedDoc } from './docs/GettingStartedDoc'
import { InstallationDoc } from './docs/InstallationDoc'
import { ThemeDoc } from './docs/ThemeDoc'
import { UtilitiesSubLayout } from './docs/utilities/UtilitiesSubLayout'
import { UtilitiesIndexDoc } from './docs/utilities/UtilitiesIndexDoc'
import { UtilitiesDisplayDoc } from './docs/utilities/UtilitiesDisplayDoc'
import { UtilitiesFlexLayoutDoc } from './docs/utilities/UtilitiesFlexLayoutDoc'
import { UtilitiesSpacingDoc } from './docs/utilities/UtilitiesSpacingDoc'
import { UtilitiesSizingDoc } from './docs/utilities/UtilitiesSizingDoc'
import { UtilitiesTypographyDoc } from './docs/utilities/UtilitiesTypographyDoc'
import { UtilitiesBorderShadowDoc } from './docs/utilities/UtilitiesBorderShadowDoc'
import { UtilitiesPositionDoc } from './docs/utilities/UtilitiesPositionDoc'
import { UtilitiesOverflowDoc } from './docs/utilities/UtilitiesOverflowDoc'
import { UtilitiesBackgroundDoc } from './docs/utilities/UtilitiesBackgroundDoc'
import { BadgeDoc } from './docs/pages/components/BadgeDoc'
import { ButtonDoc } from './docs/pages/components/ButtonDoc'
import { CalendarDoc } from './docs/pages/components/CalendarDoc'
import { CardDoc } from './docs/pages/components/CardDoc'
import { CheckboxDoc } from './docs/pages/components/CheckboxDoc'
import { InputTextDoc } from './docs/pages/components/InputTextDoc'
import { InputNumberDoc } from './docs/pages/components/InputNumberDoc'
import { InputTextWithIconDoc } from './docs/pages/components/InputTextWithIconDoc'
import { RadioDoc } from './docs/pages/components/RadioDoc'
import { SelectDoc } from './docs/pages/components/SelectDoc'
import { MultiSelectDoc } from './docs/pages/components/MultiSelectDoc'
import { AutocompleteDoc } from './docs/pages/components/AutocompleteDoc'
import { ToggleButtonDoc } from './docs/pages/components/ToggleButtonDoc'
import { SplitButtonDoc } from './docs/pages/components/SplitButtonDoc'
import { TableDoc } from './docs/pages/components/TableDoc'
import { ToastDoc } from './docs/pages/components/ToastDoc'
import { DialogDoc } from './docs/pages/components/DialogDoc'
import { AccordionDoc } from './docs/pages/components/AccordionDoc'
import { AlertDoc } from './docs/pages/components/AlertDoc'
import { AvatarDoc } from './docs/pages/components/AvatarDoc'
import { DividerDoc } from './docs/pages/components/DividerDoc'
import { ProgressDoc } from './docs/pages/components/ProgressDoc'
import { SkeletonDoc } from './docs/pages/components/SkeletonDoc'
import { TabsDoc } from './docs/pages/components/TabsDoc'
import { TooltipDoc } from './docs/pages/components/TooltipDoc'
import { SwitchDoc } from './docs/pages/components/SwitchDoc'
import { LabelDoc } from './docs/pages/components/LabelDoc'
import { StackDoc } from './docs/pages/components/StackDoc'
import { TextDoc } from './docs/pages/components/TextDoc'
import { ThemeToggleDoc } from './docs/pages/components/ThemeToggleDoc'
import { SpinnerDoc } from './docs/pages/components/SpinnerDoc'
import IntroPage from './pages/IntroPage'
import Demo from './pages/Demo'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/demo" element={<Demo />} />
        <Route element={<DocsLayout />}>
          <Route path="/docs" element={<DocsIndex />} />
          <Route path="/docs/getting-started" element={<GettingStartedDoc />} />
          <Route path="/docs/installation" element={<InstallationDoc />} />
          <Route path="/docs/theme" element={<ThemeDoc />} />
          <Route path="/docs/utilities" element={<UtilitiesSubLayout />}>
            <Route index element={<UtilitiesIndexDoc />} />
            <Route path="display" element={<UtilitiesDisplayDoc />} />
            <Route path="flex-layout" element={<UtilitiesFlexLayoutDoc />} />
            <Route path="spacing" element={<UtilitiesSpacingDoc />} />
            <Route path="sizing" element={<UtilitiesSizingDoc />} />
            <Route path="typography" element={<UtilitiesTypographyDoc />} />
            <Route path="border-shadow" element={<UtilitiesBorderShadowDoc />} />
            <Route path="position" element={<UtilitiesPositionDoc />} />
            <Route path="overflow" element={<UtilitiesOverflowDoc />} />
            <Route path="background" element={<UtilitiesBackgroundDoc />} />
          </Route>
          <Route path="/docs/components/button" element={<ButtonDoc />} />
          <Route
            path="/docs/components/input"
            element={<Navigate to="/docs/components/input-text" replace />}
          />
          <Route path="/docs/components/input-text" element={<InputTextDoc />} />
          <Route
            path="/docs/components/input-text-with-icon"
            element={<InputTextWithIconDoc />}
          />
          <Route path="/docs/components/input-number" element={<InputNumberDoc />} />
          <Route path="/docs/components/checkbox" element={<CheckboxDoc />} />
          <Route path="/docs/components/switch" element={<SwitchDoc />} />
          <Route path="/docs/components/radio" element={<RadioDoc />} />
          <Route path="/docs/components/select" element={<SelectDoc />} />
          <Route path="/docs/components/multi-select" element={<MultiSelectDoc />} />
          <Route path="/docs/components/autocomplete" element={<AutocompleteDoc />} />
          <Route path="/docs/components/toggle-button" element={<ToggleButtonDoc />} />
          <Route path="/docs/components/split-button" element={<SplitButtonDoc />} />
          <Route path="/docs/components/table" element={<TableDoc />} />
          <Route path="/docs/components/toast" element={<ToastDoc />} />
          <Route path="/docs/components/dialog" element={<DialogDoc />} />
          <Route path="/docs/components/accordion" element={<AccordionDoc />} />
          <Route path="/docs/components/tabs" element={<TabsDoc />} />
          <Route path="/docs/components/label" element={<LabelDoc />} />
          <Route path="/docs/components/card" element={<CardDoc />} />
          <Route path="/docs/components/calendar" element={<CalendarDoc />} />
          <Route path="/docs/components/badge" element={<BadgeDoc />} />
          <Route path="/docs/components/avatar" element={<AvatarDoc />} />
          <Route path="/docs/components/tooltip" element={<TooltipDoc />} />
          <Route path="/docs/components/stack" element={<StackDoc />} />
          <Route path="/docs/components/text" element={<TextDoc />} />
          <Route path="/docs/components/theme-toggle" element={<ThemeToggleDoc />} />
          <Route path="/docs/components/spinner" element={<SpinnerDoc />} />
          <Route path="/docs/components/alert" element={<AlertDoc />} />
          <Route path="/docs/components/divider" element={<DividerDoc />} />
          <Route path="/docs/components/progress" element={<ProgressDoc />} />
          <Route path="/docs/components/skeleton" element={<SkeletonDoc />} />
        </Route>
        <Route path="/installation" element={<Navigate to="/docs/installation" replace />} />
        <Route path="/theme" element={<Navigate to="/docs/theme" replace />} />
        <Route path="/components" element={<Navigate to="/docs" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
