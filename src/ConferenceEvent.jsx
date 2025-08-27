// ConferenceEvent.jsx
import React, { useState } from "react";
import "./ConferenceEvent.css";
import TotalCost from "./TotalCost";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity } from "./venueSlice";
import { incrementAvQuantity, decrementAvQuantity } from "./avSlice";
import { toggleMealSelection } from "./mealsSlice";

const ConferenceEvent = () => {
  const [showItems, setShowItems] = useState(false);
  const [numberOfPeople, setNumberOfPeople] = useState(1);

  const venueItems = useSelector((state) => state.venue);
  const avItems = useSelector((state) => state.av);
  const mealsItems = useSelector((state) => state.meals);
  const dispatch = useDispatch();

  const handleToggleItems = () => setShowItems(!showItems);

  const handleAddToCart = (index) => {
    dispatch(incrementQuantity(index));
  };

  const handleRemoveFromCart = (index) => {
    dispatch(decrementQuantity(index));
  };

  const handleIncrementAvQuantity = (index) => {
    dispatch(incrementAvQuantity(index));
  };

  const handleDecrementAvQuantity = (index) => {
    dispatch(decrementAvQuantity(index));
  };

  const handleMealSelection = (index) => {
    dispatch(toggleMealSelection(index));
  };

  const calculateTotalCost = (section) => {
    let totalCost = 0;
    if (section === "venue") {
      venueItems.forEach((item) => {
        totalCost += item.cost * item.quantity;
      });
    } else if (section === "av") {
      avItems.forEach((item) => {
        totalCost += item.cost * item.quantity;
      });
    } else if (section === "meals") {
      mealsItems.forEach((item) => {
        if (item.selected) totalCost += item.cost * numberOfPeople;
      });
    }
    return totalCost;
  };

  const venueTotalCost = calculateTotalCost("venue");
  const avTotalCost = calculateTotalCost("av");
  const mealsTotalCost = calculateTotalCost("meals");

  const totalCosts = {
    venue: venueTotalCost,
    av: avTotalCost,
    meals: mealsTotalCost,
  };

  const getItemsFromTotalCost = () => {
    const items = [];
    venueItems.forEach((item) => {
      if (item.quantity > 0) items.push({ ...item, type: "venue" });
    });
    avItems.forEach((item) => {
      if (item.quantity > 0) items.push({ ...item, type: "av" });
    });
    mealsItems.forEach((item) => {
      if (item.selected) items.push({ ...item, type: "meals", numberOfPeople });
    });
    return items;
  };

  const items = getItemsFromTotalCost();

  const ItemsDisplay = ({ items }) => {
    return (
      <div className="display_box1">
        {items.length === 0 && <p>No items selected</p>}
        {items.length > 0 && (
          <table className="table_item_data">
            <thead>
              <tr>
                <th>Name</th>
                <th>Unit Cost</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>${item.cost}</td>
                  <td>
                    {item.type === "meals" ? `For ${numberOfPeople} people` : item.quantity}
                  </td>
                  <td>
                    {item.type === "meals"
                      ? `$${item.cost * numberOfPeople}`
                      : `$${item.cost * item.quantity}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  };

  return (
    <>
      <navbar className="navbar_event_conference">
        <div className="company_logo">Conference Expense Planner</div>
        <div className="left_navbar">
          <div className="nav_links">
            <a href="#venue">Venue</a>
            <a href="#addons">Add-ons</a>
            <a href="#meals">Meals</a>
          </div>
          <button className="details_button" onClick={handleToggleItems}>
            Show Details
          </button>
        </div>
      </navbar>

      <div className="main_container">
        {!showItems ? (
          <div className="items-information">
            {/* Venue Section */}
            <div id="venue" className="venue_container container_main">
              <h1>Venue Room Selection</h1>
              <div className="venue_selection">
                {venueItems.map((item, index) => (
                  <div key={index} className="venue_main">
                    <img src={item.img} alt={item.name} />
                    <div>{item.name}</div>
                    <div>${item.cost}</div>
                    <div className="button_container">
                      <button
                        className="btn-warning"
                        onClick={() => handleRemoveFromCart(index)}
                        disabled={item.quantity === 0}
                      >
                        &#8211;
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="btn-success"
                        onClick={() => handleAddToCart(index)}
                        disabled={item.quantity === 10}
                      >
                        &#43;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="total_cost">Total Cost: ${venueTotalCost}</div>
            </div>

            {/* AV Section */}
            <div id="addons" className="venue_container container_main">
              <h1>Add-ons Selection</h1>
              <div className="addons_selection">
                {avItems.map((item, index) => (
                  <div key={index} className="av_data venue_main">
                    <img src={item.img} alt={item.name} />
                    <div>{item.name}</div>
                    <div>${item.cost}</div>
                    <div className="addons_btn">
                      <button
                        className="btn-warning"
                        onClick={() => handleDecrementAvQuantity(index)}
                        disabled={item.quantity === 0}
                      >
                        &ndash;
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="btn-success"
                        onClick={() => handleIncrementAvQuantity(index)}
                      >
                        &#43;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="total_cost">Total Cost: ${avTotalCost}</div>
            </div>

            {/* Meals Section */}
            <div id="meals" className="venue_container container_main">
              <h1>Meals Selection</h1>
              <div className="input-container venue_selection">
                <label htmlFor="numberOfPeople">
                  Number of People:
                  <input
                    type="number"
                    id="numberOfPeople"
                    value={numberOfPeople}
                    min="1"
                    onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
                  />
                </label>
              </div>
              <div className="meal_selection">
                {mealsItems.map((item, index) => (
                  <div key={index} className="meal_item">
                    <input
                      type="checkbox"
                      id={`meal_${index}`}
                      checked={item.selected}
                      onChange={() => handleMealSelection(index)}
                    />
                    <label htmlFor={`meal_${index}`}>{item.name}</label>
                    <div>${item.cost}</div>
                  </div>
                ))}
              </div>
              <div className="total_cost">Total Cost: ${mealsTotalCost}</div>
            </div>
          </div>
        ) : (
          <div className="total_amount_detail">
            <TotalCost totalCosts={totalCosts} ItemsDisplay={() => <ItemsDisplay items={items} />} />
          </div>
        )}
      </div>
    </>
  );
};

export default ConferenceEvent;
