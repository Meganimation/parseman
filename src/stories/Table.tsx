import { useState, useCallback, useEffect, useRef } from 'react';
import './Table.css'

// import { useSelector } from "react-redux";

// import { RootState } from "slices/store";

// const parsedDataHeaders: any = useSelector(
//     (state: RootState) => state.returnedData.parsedDataHeaders
//   );
const createHeaders = (headers: any) => {
  return headers.map((item: any) => ({
      text: item,
      ref: useRef(),
  }));
}

export const Table = ({
    headers = ['headerOne', 'h2', 'HeeeeaderThreeeeee', 'FOur', 'Five.'],
    minCellWidth,
    tableContent,
    onClick = () => { },
}: ITableProps) => {



    const [tableHeight, setTableHeight] = useState('auto');
    const [activeIndex, setActiveIndex] = useState(null);
    const tableElement = useRef(null);
    

    const mouseDown = (index: any) => {
        setActiveIndex(index);
      }



    tableContent = (
        <tbody>
            <tr>
                <td>
                    <span>Large Detroit Style Pizza</span>
                </td>
                <td>
                    <span>3213456785</span>
                </td>
                <td>
                    <span>$31.43</span>
                </td>
                <td>
                    <span>Pending</span>
                </td>
                <td>
                    <span>Dave</span>
                </td>
            </tr>
            <tr>
                <td>
                    <span>
                        Double Decker Club With Fries. Pickles, extra side avacado
                    </span>
                </td>
                <td>
                    <span>9874563245</span>
                </td>
                <td>
                    <span>$12.99</span>
                </td>
                <td>
                    <span>Delivered</span>
                </td>
                <td>
                    <span>Cathy</span>
                </td>
            </tr>
            <tr>
                <td>
                    <span>Family Sized Lobster Dinner</span>
                </td>
                <td>
                    <span>3456781234</span>
                </td>
                <td>
                    <span>$320.00</span>
                </td>
                <td>
                    <span>In Progress</span>
                </td>
                <td>
                    <span>Alexander</span>
                </td>
            </tr>
        </tbody>
    )

    const columns = createHeaders(headers);

    const mouseMove = useCallback(
        (e) => {
            console.log('mouse moving')
          const gridColumns = columns.map((col: any, i: any) => {
            if (i === activeIndex) {
              const width = e.clientX - col.ref.current.offsetLeft;
                console.log(tableElement.current)
              if (width >= minCellWidth) {
                return `${width}px`;
              }
            }
            return `${col.ref.current.offsetWidth}px`;
          });
         {/* @ts-ignore */ }
         tableElement.current.style.color = 'red'
         {/* @ts-ignore */ }
          tableElement.current.style.gridTemplateColumns = `${gridColumns.join(
            " "
          )}`;
        },
        [activeIndex, columns, minCellWidth]
      );

      const removeListeners = useCallback(() => {
        window.removeEventListener("mousemove", mouseMove);
        window.removeEventListener("mouseup", removeListeners);
      }, [mouseMove]);
    
      const mouseUp = useCallback(() => {
        setActiveIndex(null);
        removeListeners();
      }, [setActiveIndex, removeListeners]);
    
      useEffect(() => {
        if (activeIndex !== null) {
          window.addEventListener("mousemove", mouseMove);
          window.addEventListener("mouseup", mouseUp);
        }
    
        return () => {
          removeListeners();
        };
      }, [activeIndex, mouseMove, mouseUp, removeListeners]);
    
      // Demo only
      const resetTableCells = () => {
              {/* @ts-ignore */ }
        tableElement.current.style.gridTemplateColumns = "";
      };
    
    

    useEffect(() => {
        {/* @ts-ignore */ }
        setTableHeight(tableElement.current.offsetHeight);
    }, []);

    useEffect(() => {
        if (activeIndex !== null) {
          window.addEventListener('mousemove', mouseMove);
          window.addEventListener('mouseup', mouseUp);
        }
      
        return () => {
          removeListeners();
        }
      }, [activeIndex, mouseMove, mouseUp, removeListeners]);

    return (
        <div className="table-wrapper">
            <table className="resizeable-table" ref={tableElement}>
                <thead>
                    <tr>
                        {/* @ts-ignore */}
                        {columns.map(({ ref, text }, i) => (
                            <th ref={ref} key={text}>
                                <span>{text}</span>
                                <div
                                    style={{ height: tableHeight }}
                                    onMouseDown={() => mouseDown(i)}
                                    className={`resize-handle ${activeIndex === i ? 'active' : 'idle'}`}
                                />
                            </th>
                        ))}
                    </tr>
                </thead>
                {tableContent}
            </table>
        </div>
    );
};

interface ITableProps {
    onClick?: any;
    headers: string[];
    minCellWidth: any;
    tableContent: any;
}
