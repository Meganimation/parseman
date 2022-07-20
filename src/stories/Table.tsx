import { useState, useCallback, useEffect, useRef } from 'react';
import './Table.css'
import styled from 'styled-components';

const DyanmicTable = styled.table` {
  width: 100%;
  display: grid;
  overflow: auto;
  grid-template-columns: ${(props: { gridTemplateColumns: string }) => props.gridTemplateColumns};
`

// const createHeaders = (headers: any) => {
//   return headers.map((item: any) => ({
//     text: item,
//     ref: useRef(),
//   }));
  
// }

export const Table = ({
  headers,
  minCellWidth,
  tableContent,
  setEditInput,
  displayCorrectSortButton,
  stuff,
  setIsHeaderOnHover,
  onClick = () => { },
}: ITableProps) => {



  const gridTemplateColumnsCSS = () => {

    let arr = [];
    for (let i = 0; i < headers.length; i++) {
      arr.push(`150px`);
    }
    // setGridTemplateColumns(arr.join(' '))
    return arr.join(' ');

  }



  const [tableHeight, setTableHeight] = useState('auto');
  const [activeIndex, setActiveIndex] = useState(null);
  const [gridTemplateColumns, setGridTemplateColumns] = useState(gridTemplateColumnsCSS());
  const [arrOfWidths, setArrOfWidths] = useState([]);
  const tableElement = useRef(null);

  // const columns = createHeaders(headers);

  const mouseDoubleClick = useCallback(
    (e) => {

      //do the same thing as mouseMove but use the length of the longest item in the row to decipher the width of the cell

    },
    [activeIndex, headers, minCellWidth]
  );

  const mouseMove = useCallback(
    (e) => {

      const gridColumns = headers.map((col: any, i: any) => {

        if (i === activeIndex) {

          const width = (e.screenX / 3) //janky but works for now
          console.log('e.screenX', e.screenX)

          if (width >= minCellWidth) {

            return `${width}px`;
          }
        }

return gridTemplateColumns.split(" ")[i]
        // return `${col.ref.current.offsetWidth}px`;
      });

      console.log(gridColumns.join(' '))
      setGridTemplateColumns(gridColumns.join(' '))
    },
    [activeIndex, headers, minCellWidth]
  );

  const removeListeners = useCallback(() => {
    window.removeEventListener("mousemove", mouseMove);
    window.removeEventListener("mouseup", removeListeners);
  }, [mouseMove]);

  const mouseDown = (index: any) => {
    setActiveIndex(index);
  }


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
      <DyanmicTable className="resizeable-table" ref={tableElement} gridTemplateColumns={gridTemplateColumns}>
        <thead>
          <tr>
            {/* @ts-ignore */}
            {headers.map((text, i) => (
              <th key={text}
                onMouseEnter={() => { setIsHeaderOnHover(text) }}
                onMouseLeave={() => { setIsHeaderOnHover('none') }}
                onClick={(e) =>
                  setEditInput([e.pageY, e.clientX, text])
                }

                className={text}
              >
                <span>{text}</span> <div>{displayCorrectSortButton(i, stuff)}</div>
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
      </DyanmicTable>
    </div>
  );
};

interface ITableProps {
  onClick?: any;
  headers: string[];
  minCellWidth: any;
  tableContent: any;
  setEditInput?: any;
  displayCorrectSortButton?: any;
  content?: any;
  arrOfSortBools?: any;
  stuff?: any;
  setIsHeaderOnHover?: any;
}
