import { Link } from 'react-router-dom'

const CategoryItem = ({ index, cateType, disable }) => {
  return (
    <Link
      className={`cursor-pointer ${
        disable && 'cate-disable select-none pointer-events-none'
      } relative hover:border-gray-200 hover:shadow-sm flex flex-col items-center  px-2 py-4  col-span-1 w-[120px] border border-gray-100  row-span-${
        (index + 1) % 2 ? 1 : 2
      }`}
      style={{
        gridColumnStart: `${Math.round((index + 1) / 2)}`,
        gridRow: `${(index + 1) % 2 ? 1 : 2}`
      }}
      to={`/products/${cateType.replace(/ /g, '-')}/${'Tất cả sản phẩm'.replace(
        / /g,
        '-'
      )}`}
    >
      <div
        className="bg-no-repeat mx-auto self-start bg-cover w-[70%] h-[80px]"
        style={{
          backgroundImage: `url(${
            new URL(
              `../../assets/img/cates/cate_${index + 1}.png`,
              import.meta.url
            ).href
          })`
        }}
      ></div>
      <div
        className={` text-[14px]  text-center flex items-center justify-center`}
        key={index}
      >
        {cateType}
      </div>
    </Link>
  )
}

export default CategoryItem