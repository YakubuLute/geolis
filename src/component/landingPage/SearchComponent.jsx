import React, { useState, useEffect, useCallback } from "react";
import { MultiSelect } from '@mantine/core';
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
import { useFireStoreContext } from "../../context/FireStoreContext";
import { useLocation, useNavigate } from "react-router-dom";
import { ResizeObserverErrorBoundary } from "../shared/ResizedObserverErrorBoundary/ResizedObserverErrorBoundary";

const LAND_LISTING_PATH = '/land-listing';

const price = {
  "Less than ₵10,000": "0-10000",
  "₵10,000 - ₵15,000": "10000-15000",
  "₵15,000 - ₵20,000": "15000-20000",
  "₵20,000 - ₵30,000": "20000-30000",
  "Greater than ₵30,000": "30000-Infinity"
};

const size = {
  "Less than 1 acre": "0-1",
  "1-5 acres": "1-5",
  "5.1 - 10 acres": "5.1-10",
  "More than 10 acres": "10-Infinity"
};

const slope = {
  "Mostly Flat": 'flat',
  "Rolling": 'rolling',
  "Sloped": 'sloped',
  "Dry": 'dry',
  "Wet": 'wet'
};

function SearchComponent({ onSearch }) {
  const { landData } = useFireStoreContext();
  const [locations, setLocations] = useState([]);
  const [priceState, setPriceState] = useState([]);
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
    const uniqueLocations = [...new Set(landData?.map(land => land.location))];
    setLocations(uniqueLocations);
  }, [landData]);

  const performSearch = useCallback((criteria) => {
    onSearch(criteria);
    if (location.pathname === LAND_LISTING_PATH) {
      navigate(LAND_LISTING_PATH, { replace: true });
    }
  }, [onSearch, navigate, location.pathname]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const extractedCriteria = {
      locations: searchParams.getAll('locations'),
      price: searchParams.getAll('price'),
      size: searchParams.getAll('size'),
      slope: searchParams.getAll('slope'),
    };
  
    if (Object.values(extractedCriteria).some(arr => arr.length > 0)) {
      setValue(extractedCriteria.locations);
      setPriceState(extractedCriteria.price);
      setSizeState(extractedCriteria.size);
      setSlopeState(extractedCriteria.slope);
      performSearch(extractedCriteria);
    }
  }, [location.search, performSearch]);

  const handleValueSelect = (val) => {
    setValue((current) =>
      current.includes(val) ? current.filter((v) => v !== val) : [...current, val]
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
      price: priceState,
      size: sizeState,
      slope: slopeState,
    };

    if (location.pathname !== LAND_LISTING_PATH) {
      const queryString = new URLSearchParams();
      Object.entries(searchCriteria).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach(item => queryString.append(key, item));
        } else if (value) {
          queryString.append(key, value);
        }
      });
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
                  <ResizeObserverErrorBoundary>
                  <div className="accordion__content position-relative">
                      <MultiselectComponent
                        label={"Price Range"}
                        data={Object.entries(price).map(([key, value]) => ({ value, label: key }))}
                        setValue={setPriceState}
                        value={priceState}
                      />
                      <MultiselectComponent
                        label={"Size Range"}
                        data={Object.entries(size).map(([key, value]) => ({ value, label: key }))}
                        setValue={setSizeState}
                        value={sizeState}
                      />
                      <MultiselectComponent
                        label={"Slope Type"}
                        data={Object.entries(slope).map(([key, value]) => ({ value, label: key }))}
                        setValue={setSlopeState}
                        value={slopeState}
                      />
                    </div>
                  </ResizeObserverErrorBoundary>
                  
                  </Accordion.Panel>
                </Accordion.Item>
              </div>
            </Accordion>
          </div>
          
          <button
            className="btn"
            style={{ maxHeight: "3.5rem" }}
            onClick={handleSubmit}
          >
            Search For Land
          </button>
        </div>
      </div>
    </section>
  );
}

function MultiselectComponent({ label, data, setValue, value }) {
  return (
    <MultiSelect
      data={data}
      label={label}
      placeholder={`Select ${label}`}
      searchable
      nothingFound="No options"
      value={value}
      onChange={setValue}
    />
  );
}

export default SearchComponent;