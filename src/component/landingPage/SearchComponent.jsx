import React, { useState, useEffect } from "react";
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
import MultiselectComponent from "../shared/mutiselect/multiselect";
import { useFireStoreContext } from "../../../../context/FireStoreContext";

const zoning = [
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

const slope = ["Mostly Flat", "Rolling", "Sloped"];

function SearchComponent({ onSearch }) {
  const { landData } = useFireStoreContext();
  const [locations, setLocations] = useState([]);
  const [zoneState, setZoneState] = useState([]);
  const [slopeState, setSlopeState] = useState([]);
  const [sizeState, setSizeState] = useState([]);
  const [search, setSearch] = useState("");
  const [value, setValue] = useState([]);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });

  useEffect(() => {
    // Extract unique locations from landData
    const uniqueLocations = [...new Set(landData.map(land => land.location))];
    setLocations(uniqueLocations);
  }, [landData]);

  const handleValueSelect = (val) =>
    setValue((current) =>
      current.includes(val)
        ? current.filter((v) => v !== val)
        : [...current, val]
    );

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
      zoning: zoneState,
      size: sizeState,
      slope: slopeState,
    };
    onSearch(searchCriteria);
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
                            search.length === 0
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
                    <Combobox.Empty>Nothing found...</Combobox.Empty>
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
                        value={zoning}
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