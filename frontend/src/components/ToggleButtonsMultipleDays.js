import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Stack } from '@mui/material';

export default function ToggleButtonsMultipleDays({classDays, setClassDays}) {
  const dayNames = ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"]

  const handleDays = (event, newFormats) => {
    setClassDays(() => newFormats);
    console.log(classDays)
  };

  return (
    <Stack>
      <ToggleButtonGroup
        value={classDays}
        onChange={handleDays}
        aria-label="schedule days"
        orientation="vertical"
      >
        {
          dayNames.map(day => {
            return (<ToggleButton value={day} aria-label="bold">{day}
            </ToggleButton>)
          })
        }
      </ToggleButtonGroup>
    </Stack>
  );
}
