import React, { useState, useEffect, useCallback } from "react";

import { Button, MultiSelect } from '@mantine/core';
import {
  PillsInput,
  Pill,
  Combobox,
  CheckIcon,
  Group,
  useCombobox,
  Accordion,
  rem,
} from "@mantine/core";
import {
  ScreenSearchDesktopRounded,
} from "@mui/icons-material";
// import MultiselectComponent from "../shared/mutiselect/multiselect";
import { useFireStoreContext } from "../../context/FireStoreContext";
import { useLocation, useNavigate } from "react-router-dom";

const LAND_LISTING_PATH = '/land-listing';

const environment = [
  "Residential",
  "Commercial",
  "Agricultural",
  "Recreational",
  "Forest/Conservation",
  "Not Zoned/Unclassified",
];

const size = [
  "Less than 1 acre",
  "1-5 acres",
  "5.1 - 10 acres",
  "More than 10 acres",
];

const slope = ["Mostly Flat", "Rolling", "Sloped", "Dry", "Wet"];

function SearchComponent({ onSearch }) {
  const { landData } = useFireStoreContext();
  const [locations, setLocations] = useState([]);
  const [zoneState, setZoneState] = useState([]);
  const [slopeState, setSlopeState] = useState([]);
  const [sizeState, setSizeState] = useState([]);
  const [search, setSearch] = useState("");
  const [value, setValue] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });

  useEffect(() => {
    // Extract unique locations from landData
    console.log("Extracting land data", landData);
    const uniqueLocations = [...new Set(landData.map(land => land.location))];
    setLocations(uniqueLocations);
  }, [landData]);

  const performSearch = useCallback((criteria) => {
    onSearch(criteria);
    // Reset URL parameters after search
    if (location.pathname === LAND_LISTING_PATH) {
      navigate(LAND_LISTING_PATH, { replace: true });
    }
  }, [onSearch, navigate, location.pathname]);

  
  useEffect(() => {
    // Extract search criteria from URL query parameters
    const searchParams = new URLSearchParams(location.search);
    const extractedCriteria = {
      locations: searchParams.getAll('locations'),
      environment: searchParams.getAll('environment'),
      size: searchParams.getAll('size'),
      slope: searchParams.getAll('slope'),
    };
  
    // Only update state if there are actual parameters
    if (Object.values(extractedCriteria).some(arr => arr.length > 0)) {
      setValue(extractedCriteria.locations);
      setZoneState(extractedCriteria.environment);
      setSizeState(extractedCriteria.size);
      setSlopeState(extractedCriteria.slope);
  
      // Perform search with extracted criteria
      performSearch(extractedCriteria);
    }
  }, [location.search, performSearch]);

  const handleValueSelect = (val) => {
    setValue((current) =>
      current.includes(val)
        ? current.filter((v) => v !== val)
        : [...current, val]
    );
    setSearch("");
  };


  
  const handleValueRemove = (val) =>
    setValue((current) => current.filter((v) => v !== val));

  const values = value.map((item) => (
    <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
      {item}
    </Pill>
  ));

  const options = locations
    .filter((item) => item.toLowerCase().includes(search.trim().toLowerCase()))
    .map((item) => (
      <Combobox.Option value={item} key={item} active={value.includes(item)}>
        <Group gap="sm">
          {value.includes(item) ? <CheckIcon size={12} /> : null}
          <span>{item}</span>
        </Group>
      </Combobox.Option>
    ));

  const handleSubmit = () => {
    const searchCriteria = {
      locations: value,
      environment: zoneState,
      size: sizeState,
      slope: slopeState,
    };

    if (location.pathname !== LAND_LISTING_PATH) {
      // Convert searchCriteria to query string
      const queryString = new URLSearchParams();
      Object.entries(searchCriteria).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach(item => queryString.append(key, item));
        } else if (value) {
          queryString.append(key, value);
        }
      });

      // Navigate to the land listing page with the query parameters
      navigate(`${LAND_LISTING_PATH}?${queryString.toString()}`);
    } else {
      performSearch(searchCriteria);
    }
  };

  return (
    <section className="section section__search section__search--home ">
      <div className="container " id="search">
        <div className="flex flex-wrap gap-10 search__container">
          <div className="normal__search">
            <Combobox store={combobox} onOptionSubmit={handleValueSelect}>
              <Combobox.DropdownTarget>
                <PillsInput onClick={() => combobox.openDropdown()}>
                  <Pill.Group>
                    {values}
                    <Combobox.EventsTarget>
                      <PillsInput.Field
                        onFocus={() => combobox.openDropdown()}
                        onBlur={() => combobox.closeDropdown()}
                        value={search}
                        placeholder="Add a location. You can also select multiples"
                        onChange={(event) => {
                          combobox.updateSelectedOptionIndex();
                          setSearch(event.currentTarget.value);
                        }}
                        onKeyDown={(event) => {
                          if (
                            event.key === "Backspace" &&
                            search.length === 0 &&
                            value.length > 0
                          ) {
                            event.preventDefault();
                            handleValueRemove(value[value.length - 1]);
                          }
                        }}
                      />
                    </Combobox.EventsTarget>
                  </Pill.Group>
                </PillsInput>
              </Combobox.DropdownTarget>

              <Combobox.Dropdown>
                <Combobox.Options>
                  {options.length > 0 ? (
                    options
                  ) : (
                   <>
                    <Combobox.Empty>Nothing found...</Combobox.Empty>
                    
                   </>
                  )}
                </Combobox.Options>
              </Combobox.Dropdown>
            </Combobox>
          </div>
          <div className="advance__search">
            <Accordion transitionDuration={700}>
              <div className="flex">
                <Accordion.Item value="photos">
                  <Accordion.Control
                    icon={
                      <ScreenSearchDesktopRounded
                        style={{
                          color: "var(--mantine-color-red-filled",
                          width: rem(20),
                          height: rem(20),
                        }}
                      />
                    }
                  >
                    <p className="text-white">Advance Search</p>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <div className="accordion__content position-relative">
                      <MultiselectComponent
                        label={"Any Zone"}
                        value={environment}
                        handleChange={(event) => setZoneState(event.target.value)}
                        setvalueState={setZoneState}
                        valueState={zoneState}
                      />
                      <MultiselectComponent
                        label={"Any Size"}
                        value={size}
                        handleChange={(event) => setSizeState(event.target.value)}
                        setvalueState={setSizeState}
                        valueState={sizeState}
                      />
                      <MultiselectComponent
                        label={"Any Slope"}
                        // placeholder={`Select ${label}`}
                        value={slope}
                        handleChange={(event) => setSlopeState(event.target.value)}
                        setvalueState={setSlopeState}
                        valueState={slopeState}
                      />
                    </div>
                  </Accordion.Panel>
                </Accordion.Item>
              </div>
            </Accordion>
          </div>

          <button
            className="btn"
            style={{ maxHeight: "3.7rem" }}
            onClick={handleSubmit}
          >
            Search For Land
          </button>
        </div>
      </div>
    </section>
  );
}

export default SearchComponent;



function MultiselectComponent({ label, value, handleChange, setvalueState, valueState }) {
  return (
    <MultiSelect
      data={value}
      label={label}
      placeholder={`Select ${label}`}
      searchable
      nothingFound="No options"
      value={valueState}
      onChange={setvalueState}
    />
  );
}

// export default MultiselectComponent;