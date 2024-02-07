import React, { useState } from "react";
import {
  PillsInput,
  Pill,
  Combobox,
  CheckIcon,
  Group,
  useCombobox,
  Accordion,
  rem,
  InputLabel,
} from "@mantine/core";
import {
  PictureInPictureOutlined,
  ScreenSearchDesktopRounded,
} from "@mui/icons-material";
import MultiselectComponent from "../shared/mutiselect/multiselect";

const communities = ["Anyinabrem", "Kenten", "Bamiri", "Fiaso", "Nkwaeso"];

// mui
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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
function Search() {
  // mui select
  const [zoneState, setZoneState] = useState([]);
  const [slopeState, setSlopeState] = useState([]);
  const [sizeState, setSizeState] = useState([]);

  // zoning state
  const handleZoningChange = (event) => {
    const {
      target: { value },
    } = event;
    setZoneState(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  // size event
  const handleSizeChange = (event) => {
    const {
      target: { value },
    } = event;
    setSizeState(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  // slope event
  const handleSlopeChange = (event) => {
    const {
      target: { value },
    } = event;
    setSlopeState(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });

  const [search, setSearch] = useState("");
  const [value, setValue] = useState([]);

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

  const options = communities
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
    return;
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
                        placeholder="Add a community. You can also select multiples"
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
          {/* advance search */}
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
                        handleChange={handleZoningChange}
                        setvalueState={setZoneState}
                        valueState={zoneState}
                      />
                      <MultiselectComponent
                        label={"Any Size"}
                        value={size}
                        handleChange={handleSizeChange}
                        setvalueState={setSizeState}
                        valueState={sizeState}
                      />
                      <MultiselectComponent
                        label={"Any Slope"}
                        value={slope}
                        handleChange={handleSlopeChange}
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

export default Search;
