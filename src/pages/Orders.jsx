import React, { useEffect } from "react";
import { useSelector } from "react-redux";
function Orders() {
  const { user, orders } = useSelector((state) => state.comfy);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!user) {
  //     navigate("/login");
  //   }
  // }, []);
  console.log(orders);
  return (
    <div>
      <h1 className="my-3 font-bold btn btn-ghost">
        {orders.length} - Orders is pending
      </h1>
      {orders.length ? (
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Address</th>
                <th>Cost</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item, i) => {
                return (
                  <tr key={item.date}>
                    <th>{i + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.address}</td>
                    <td>
                      {item.cost.toString().slice(0, -2)}.
                      {item.cost.toString().slice(-2)}$
                    </td>
                    <td>{item.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="py-12 w-full text-center">
          <h1 className="text-3xl font-bold">You don't have orders yet</h1>
        </div>
      )}
    </div>
  );
}

export default Orders;
