import { format} from "date-fns-tz";
import { addHours, parseISO } from "date-fns";

function ModalOrders({ orderData }: any) {
  const formatDate = (dateString: string) => {
    const pattern = "dd/MM/yyyy HH:mm:ss";
    const timeZone = "America/Sao_Paulo";
    const zonedDate = addHours(parseISO(dateString), -3);
    return format(zonedDate, pattern, { timeZone });
  };

  return (
    <>
      <div className="orders bg-white p-4 rounded shadow max-h-96 overflow-y-auto flex flex-col border-2 border-solid border-lavender dark:bg-foregroundDark">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Symbol</th>
              <th className="px-4 py-2 text-left">Quantity</th>
              <th className="px-4 py-2 text-left">Buy Price</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orderData?.map((order: any, index: number) => (
              <tr key={index}>
                <td className="px-4 py-2">{order.asset_name}</td>
                <td className="px-4 py-2">{order.asset_symbol}</td>
                <td className="px-4 py-2">{order.quantity}</td>
                <td className="px-4 py-2">${order?.amount?.toFixed(2)}</td>
                <td className="px-4 py-2">{formatDate(order.createdAt)}</td>
                <td
                  className={`px-4 py-2 ${
                    order.type === "buy" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {order.type}
                </td>
                <td
                  className={`px-4 py-2 ${
                    order.status === "filled"
                      ? "text-green-500"
                      : "text-yellow-500"
                  }`}
                >
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ModalOrders;
