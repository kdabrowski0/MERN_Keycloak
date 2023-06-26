import React from "react";
import "./Info.css";
import {
  useGetShoesWithPriceOver100Query,
  useGetShoesAveragePriceQuery,
  useGetShoesCountQuery,
  useGetShoesWithCollaborationQuery,
  useGetShoesWithoutCollaborationQuery,
  useGetShoesHighestPriceQuery,
  useGetShoesLowestPriceQuery,
  useGetShoesMostCommentsQuery,
  useGetShoesTotalCommentsQuery
} from "../features/shoes/shoesApiSlice";
import { Table } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const Info = () => {
  const { data: priceOver100, isSuccess: priceOver100Succes } =
    useGetShoesWithPriceOver100Query();
  const { data: averagePrice, isSuccess: averagePriceSucces } =
    useGetShoesAveragePriceQuery();
  const { data: withCollab, isSuccess: withCollabSucces } =
    useGetShoesWithCollaborationQuery();
  const { data: withoutCollab, isSuccess: withoutCollabSucces } =
    useGetShoesWithoutCollaborationQuery();
  const { data: shoeCount, isSuccess: countShoesSucces } =
    useGetShoesCountQuery();
  const { data: shoeHigh, isSuccess: highShoesSucces } =
    useGetShoesHighestPriceQuery();
  const { data: shoeLow, isSuccess: lowShoesSucces } =
    useGetShoesLowestPriceQuery();
  const { data: shoeComm, isSuccess: commentsShoesSucces } =
    useGetShoesMostCommentsQuery();
  const { data: shoeTotalComm, isSuccess: totalcommentsShoesSucces } =
    useGetShoesTotalCommentsQuery()
  

  if (
    priceOver100Succes &&
    averagePriceSucces &&
    withCollabSucces &&
    withoutCollabSucces &&
    countShoesSucces &&
    highShoesSucces &&
    lowShoesSucces &&
    commentsShoesSucces &&
    totalcommentsShoesSucces
  ) {
    const price100 = priceOver100.count;
    const avgPrice = Math.round(averagePrice.average);
    const withCollaboration = withCollab.count;
    const withoutCollaboration = withoutCollab.count;
    const shoeCounter = shoeCount.count;
    const shoeHighest = shoeHigh
    const shoeLowest = shoeLow
    const shoeCommments = shoeComm
    const shoeTotalComments = shoeTotalComm
    const data = [
      {
        name: "Total Shoes",
        value: shoeCounter,
        key: '1'
      },
      {
        name: "Shoes with Price over 100$",
        value: price100,
        key: '2'
      },
      {
        name: "Shoes With Collaboration",
        value: withCollaboration,
        key: '3'
      },
      {
        name: "Shoes Without Collaboration",
        value: withoutCollaboration,
        key: '4'
      },
    ];
    const data2 = [
      {
        name: "Average Shoe Price",
        value: `${avgPrice}$`,
        shoeName: "Average of all",
        key: '3'
      },
      {
        name: "Highest Shoe Price",
        value: `${shoeHighest.price}$`,
        shoeName: shoeHighest.shoeName,
        key: '1'
      },
      {
        name: "Lowest Shoe Price",
        value: `${shoeLowest.price}$`,
        shoeName: shoeLowest.shoeName,
        key: '2'
      },
    ];
    const data3 = [
      {
        name: "Shoe Total Comments",
        amountOfComments: shoeTotalComments,
        shoeName: "All shoes Total comments",
        key: '1'
      },
      {
        name: "Shoe with most comments",
        amountOfComments: shoeCommments.comments,
        shoeName: shoeCommments.shoeName,
        key: '3'
      },
    ];
    const datachart = [
      {
        name: "Total Shoes",
        value: shoeCounter,
        key: '1'
      },
      {
        name: "Price over 100$",
        value: price100,
        key: '2'
      },
      {
        name: "With Collab",
        value: withCollaboration,
        key: '3'
      },
      {
        name: "Without Collab",
        value: withoutCollaboration,
        key: '4'
      },
    ];

    const datachart2 = [
      {
        name: "Average Shoe Price",
        value: avgPrice,
        key: '1'
      },
      {
        name: "Highest Shoe Price",
        value: shoeHighest.price,
        shoeName: shoeHighest.shoeName,
        key: '2'
      },
      {
        name: "Lowest Shoe Price",
        value: shoeLowest.price,
        shoeName: shoeLowest.shoeName,
        key: '3'
      },
    ];
    const datachart3 = [
      {
        name: "Total Comments",
        value: shoeTotalComments,
        key: '2'
      },
      {
        name: "Most Comments in one shoe",
        value: shoeCommments.comments,
        key: '1'
      },
      
    ];

    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Value",
        dataIndex: "value",
        key: "value",
      },
    ];
    const columns2 = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Value",
        dataIndex: "value",
        key: "value",
      },
      {
        title: "shoeName",
        dataIndex: "shoeName",
        key: "shoeName",
      },

    ];
    const columns3 = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Amount of shoe Comments",
        dataIndex: "amountOfComments",
        key: "amountOfComments",
      },
      {
        title: "shoeName",
        dataIndex: "shoeName",
        key: "shoeName",
      },
    ];

    return (
      <div>
        Shoes
        <div className="info">
          <Table columns={columns} dataSource={data} pagination={false} />
          <BarChart width={700} height={400} data={datachart}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </div>
        Shoes Prices
        <div className="info">
          <Table columns={columns2} dataSource={data2} pagination={false} />
          <BarChart width={700} height={400} data={datachart2}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </div>
        Shoe Comments
        <div className="info">
          <Table columns={columns3} dataSource={data3} pagination={false} />
          <BarChart width={700} height={400} data={datachart3}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </div>
      </div>
    );
  }
};

export default Info;
