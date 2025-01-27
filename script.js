/*
  script.js
  -----------
  Contains all interactive logic for Accounting 101 practice.
  Each function is documented with a brief description and
  usage notes, without changing any existing functionality.
*/

/**
 * Switches between the three tabs: "Journal Entries", "T-Account", and "Trial Balance".
 * @param {string} tabName - The ID of the content div to show.
 * @param {HTMLElement} el - The tab button that was clicked.
 */
function openTab(tabName, el) {
    const contents = document.getElementsByClassName('content');
    for (let c of contents) c.classList.remove('active');
  
    const tabs = document.getElementsByClassName('tab');
    for (let t of tabs) t.classList.remove('active');
  
    document.getElementById(tabName).classList.add('active');
    el.classList.add('active');
  }
  
  // Account options available (not used directly but references for hints, etc.)
  const accountOptions = [
    "Cash", "Accounts Receivable", "Inventory", "Supplies", "Prepaid Insurance",
    "Equipment", "Accumulated Depreciation", "Dividends", "Interest Income",
    "Interest Expense", "Retained Earnings", "Marketing Expense", "Unearned Revenue",
    "Taxes Payable", "Insurance Expense", "Depreciation Expense",
    "Rent Expense", "Salary Expense", "Salary Payable", "Bad Debt Expense",
    "Bonus Expense", "Bonus Payable", "Charitable Donations Expense", 
    "Cleaning Expense", "Credit Card Payable", "Delivery Expense",
    "Employee Benefits Expense", "Employee Benefits Payable", "Freight Expense", 
    "Legal Expense", "Legal Fees Payable", "Loans Payable", "Maintenance Expense", 
    "Notes Receivable", "Prepaid Lease Expense", "Prepaid Rent", 
    "Prepaid Software Subscription", "Property Tax Expense", "Property Tax Payable",
    "Raw Materials", "Repair Expense", "Servicing Expense", "Shrinkage Expense", 
    "Tools", "Furniture", "Wages Expense", "Wages Payable",
    "Revenue", "Sales Revenue", "Cost of Goods Sold", "Foreign Exchange Loss",
    "Rent Income", "Renovation Expense",
    "Advertising Expense", "Common Stock","Interest Payable"  
  ];
  
  

  
  /**
   * Array of transaction scenarios. Each scenario has:
   * - description: The text describing the transaction.
   * - hint: A quick pointer to help the user.
   * - solution: An array of {account, debit, credit}.
   * - explanation: A textual explanation of the correct entry.
   */
////////////////////////////////////////////////////////////////
// 1. FULL 100-SCENARIO ARRAY (WITHOUT "Transaction (x/x)" TEXT)
////////////////////////////////////////////////////////////////
  const allScenarios = [
    {
      description: "🎉 Purchased office supplies for $500 using cash.",
      hint: "Think about which assets are increasing and decreasing!",
      solution: [
        { account: "Supplies", debit: 500, credit: 0 },
        { account: "Cash",     debit: 0,   credit: 500 }
      ],
      explanation: "📌 **Debit Supplies $500** (increasing assets), **Credit Cash $500** (decreasing assets)."
    },
    {
      description: "💼 Provided services to a customer for $1,200 on account.",
      hint: "Revenue increases and Accounts Receivable increases!",
      solution: [
        { account: "Accounts Receivable", debit: 1200, credit: 0 },
        { account: "Revenue",             debit: 0,    credit: 1200 }
      ],
      explanation: "📌 **Debit Accounts Receivable $1,200** (increasing assets), **Credit Revenue $1,200** (increasing equity)."
    },
    {
      description: "🏠 Paid this month's rent expense of $800.",
      hint: "Expenses increase and Cash decreases!",
      solution: [
        { account: "Rent Expense", debit: 800, credit: 0 },
        { account: "Cash",         debit: 0,   credit: 800 }
      ],
      explanation: "📌 **Debit Rent Expense $800** (increasing expenses), **Credit Cash $800** (decreasing assets)."
    },
    {
      description: "🔧 Purchased equipment for $2,500 on credit.",
      hint: "Equipment is an asset and Accounts Payable is a liability!",
      solution: [
        { account: "Equipment",        debit: 2500, credit: 0 },
        { account: "Accounts Payable", debit: 0,    credit: 2500 }
      ],
      explanation: "📌 **Debit Equipment $2,500** (increasing assets), **Credit Accounts Payable $2,500** (increasing liabilities)."
    },
    {
      description: "💰 Received $3,000 from a client for services performed.",
      hint: "Cash increases and Revenue increases!",
      solution: [
        { account: "Cash",    debit: 3000, credit: 0 },
        { account: "Revenue", debit: 0,    credit: 3000 }
      ],
      explanation: "📌 **Debit Cash $3,000** (increasing assets), **Credit Revenue $3,000** (increasing equity)."
    },
    {
      description: "📅 Accrued $4000 of salaries expense at the end of the month.",
      hint: "Expenses are increasing and Salaries Payable is a liability!",
      solution: [
        { account: "Salary Expense", debit: 4000, credit: 0 },
        { account: "Salary Payable", debit: 0,    credit: 4000 }
      ],
      explanation: "📌 **Debit Salary Expense $4000** (increasing expenses), **Credit Salary Payable $4000** (increasing liabilities)."
    },
    {
      description: "🛠️ Recorded depreciation of equipment at $200.",
      hint: "Depreciation Expense increases and Accumulated Depreciation increases!",
      solution: [
        { account: "Depreciation Expense",     debit: 200, credit: 0 },
        { account: "Accumulated Depreciation", debit: 0,   credit: 200 }
      ],
      explanation: "📌 **Debit Depreciation Expense $200** (increasing expenses), **Credit Accumulated Depreciation $200** (increasing contra-assets)."
    },
    {
      description: "🔄 Received $1,500 for a service to be performed next month.",
      hint: "Unearned Revenue is a liability and Cash is an asset!",
      solution: [
        { account: "Cash",            debit: 1500, credit: 0 },
        { account: "Unearned Revenue", debit: 0,   credit: 1500 }
      ],
      explanation: "📌 **Debit Cash $1,500** (increasing assets), **Credit Unearned Revenue $1,500** (increasing liabilities)."
    },
    {
      description: "📢 Paid $300 for advertising expense in cash.",
      hint: "Advertising Expense increases and Cash decreases!",
      solution: [
        { account: "Advertising Expense", debit: 300, credit: 0 },
        { account: "Cash",                debit: 0,   credit: 300 }
      ],
      explanation: "📌 **Debit Advertising Expense $300** (increasing expenses), **Credit Cash $300** (decreasing assets)."
    },
    {
      description: "💸 Declared and paid dividends of $1,000.",
      hint: "Dividends decrease Equity and Cash decreases!",
      solution: [
        { account: "Dividends", debit: 1000, credit: 0 },
        { account: "Cash",      debit: 0,    credit: 1000 }
      ],
      explanation: "📌 **Debit Dividends $1,000** (decreasing equity), **Credit Cash $1,000** (decreasing assets)."
    },
    {
      description: "🚛 Paid $700 for vehicle repairs in cash.",
      hint: "Repair Expense increases and Cash decreases!",
      solution: [
        { account: "Repair Expense", debit: 700, credit: 0 },
        { account: "Cash",           debit: 0,   credit: 700 }
      ],
      explanation: "📌 **Debit Repair Expense $700** (increasing expenses), **Credit Cash $700** (decreasing assets)."
    },
    {
      description: "🏦 Borrowed $10,000 from the bank and deposited it in the business account.",
      hint: "Cash increases and Loans Payable increases!",
      solution: [
        { account: "Cash",         debit: 10000, credit: 0 },
        { account: "Loans Payable", debit: 0,    credit: 10000 }
      ],
      explanation: "📌 **Debit Cash $10,000** (increasing assets), **Credit Loans Payable $10,000** (increasing liabilities)."
    },
    {
      description: "📤 Sold merchandise worth $2,000 for cash. The cost of the merchandise was $1,200.",
      hint: "Recognize both revenue and cost of goods sold!",
      solution: [
        { account: "Cash",              debit: 2000, credit: 0 },
        { account: "Sales Revenue",     debit: 0,    credit: 2000 },
        { account: "Cost of Goods Sold", debit: 1200, credit: 0 },
        { account: "Inventory",         debit: 0,    credit: 1200 }
      ],
      explanation: "📌 **Debit Cash $2,000** (increasing assets), **Credit Sales Revenue $2,000** (increasing equity). **Debit Cost of Goods Sold $1,200** (increasing expenses), **Credit Inventory $1,200** (decreasing assets)."
    },
    {
      description: "📦 Purchased $5,000 of raw materials on credit.",
      hint: "Raw Materials is an asset and Accounts Payable is a liability!",
      solution: [
        { account: "Raw Materials",    debit: 5000, credit: 0 },
        { account: "Accounts Payable", debit: 0,    credit: 5000 }
      ],
      explanation: "📌 **Debit Raw Materials $5,000** (increasing assets), **Credit Accounts Payable $5,000** (increasing liabilities)."
    },
    {
      description: "👷 Paid $2,500 in wages to employees.",
      hint: "Wages Expense increases and Cash decreases!",
      solution: [
        { account: "Wages Expense", debit: 2500, credit: 0 },
        { account: "Cash",          debit: 0,    credit: 2500 }
      ],
      explanation: "📌 **Debit Wages Expense $2,500** (increasing expenses), **Credit Cash $2,500** (decreasing assets)."
    },
    {
      description: "💳 Received $1,000 from customers for prior credit sales.",
      hint: "Cash increases and Accounts Receivable decreases!",
      solution: [
        { account: "Cash",              debit: 1000, credit: 0 },
        { account: "Accounts Receivable", debit: 0,   credit: 1000 }
      ],
      explanation: "📌 **Debit Cash $1,000** (increasing assets), **Credit Accounts Receivable $1,000** (decreasing assets)."
    },
    {
      description: "📝 Issued $20,000 in shares for cash.",
      hint: "Cash increases and Equity increases!",
      solution: [
        { account: "Cash",          debit: 20000, credit: 0 },
        { account: "Common Stock",  debit: 0,     credit: 20000 }
      ],
      explanation: "📌 **Debit Cash $20,000** (increasing assets), **Credit Common Stock $20,000** (increasing equity)."
    },
    {
      description: "🔄 Paid $500 to settle part of Accounts Payable.",
      hint: "Accounts Payable decreases and Cash decreases!",
      solution: [
        { account: "Accounts Payable", debit: 500, credit: 0 },
        { account: "Cash",             debit: 0,   credit: 500 }
      ],
      explanation: "📌 **Debit Accounts Payable $500** (decreasing liabilities), **Credit Cash $500** (decreasing assets)."
    },
    {
      description: "📤 Recognized revenue of $1,000 from previously unearned revenue.",
      hint: "Unearned Revenue decreases and Revenue increases!",
      solution: [
        { account: "Unearned Revenue", debit: 1000, credit: 0 },
        { account: "Revenue",          debit: 0,    credit: 1000 }
      ],
      explanation: "📌 **Debit Unearned Revenue $1,000** (decreasing liabilities), **Credit Revenue $1,000** (increasing equity)."
    },
    {
      description: "📄 Incurred $600 for utilities expense but will pay later.",
      hint: "Utilities Expense increases and Accounts Payable increases!",
      solution: [
        { account: "Utilities Expense", debit: 600, credit: 0 },
        { account: "Accounts Payable", debit: 0,    credit: 600 }
      ],
      explanation: "📌 **Debit Utilities Expense $600** (increasing expenses), **Credit Accounts Payable $600** (increasing liabilities)."
    },
    {
      description: "🔧 Purchased $3,000 of tools using a company credit card.",
      hint: "Tools are assets and Credit Card Payable is a liability!",
      solution: [
        { account: "Tools",                debit: 3000, credit: 0 },
        { account: "Credit Card Payable",  debit: 0,    credit: 3000 }
      ],
      explanation: "📌 **Debit Tools $3,000** (increasing assets), **Credit Credit Card Payable $3,000** (increasing liabilities)."
    },
    {
      description: "🏦 Repaid $2,000 of a bank loan.",
      hint: "Loans Payable decreases and Cash decreases!",
      solution: [
        { account: "Loans Payable", debit: 2000, credit: 0 },
        { account: "Cash",          debit: 0,    credit: 2000 }
      ],
      explanation: "📌 **Debit Loans Payable $2,000** (decreasing liabilities), **Credit Cash $2,000** (decreasing assets)."
    },
    {
      description: "🏢 Paid $4,000 for a one-year insurance policy.",
      hint: "Prepaid Insurance increases and Cash decreases!",
      solution: [
        { account: "Prepaid Insurance", debit: 4000, credit: 0 },
        { account: "Cash",              debit: 0,    credit: 4000 }
      ],
      explanation: "📌 **Debit Prepaid Insurance $4,000** (increasing assets), **Credit Cash $4,000** (decreasing assets)."
    },
    {
      description: "💻 Purchased a computer for $1,200 in cash.",
      hint: "Equipment increases and Cash decreases!",
      solution: [
        { account: "Equipment", debit: 1200, credit: 0 },
        { account: "Cash",      debit: 0,    credit: 1200 }
      ],
      explanation: "📌 **Debit Equipment $1,200** (increasing assets), **Credit Cash $1,200** (decreasing assets)."
    },
    {
      description: "📈 Earned $800 in interest income.",
      hint: "Cash increases and Interest Income increases!",
      solution: [
        { account: "Cash",           debit: 800, credit: 0 },
        { account: "Interest Income", debit: 0,   credit: 800 }
      ],
      explanation: "📌 **Debit Cash $800** (increasing assets), **Credit Interest Income $800** (increasing equity)."
    },
    {
      description: "📊 Reinvested $5,000 of earnings into the business.",
      hint: "Retained Earnings decrease and Cash decreases!",
      solution: [
        { account: "Cash", debit: 0, credit: 5000 },
        { account: "Retained Earnings", debit: 5000, credit: 0 }
      ],
      explanation: "📌 **Debit Retained Earnings $5,000** (decreasing equity), **Credit Cash $5,000** (decreasing assets)."
    },
    {
      description: "🚚 Leased a delivery truck and made a $1,000 down payment.",
      hint: "Prepaid Lease Expense increases, and Cash decreases!",
      solution: [
        { account: "Prepaid Lease Expense", debit: 1000, credit: 0 },
        { account: "Cash",                  debit: 0,    credit: 1000 }
      ],
      explanation: "📌 **Debit Prepaid Lease Expense $1,000** (increasing an asset), **Credit Cash $1,000** (decreasing an asset)."
    },
    {
      description: "📦 Returned $200 of defective raw materials purchased on credit.",
      hint: "Raw Materials decrease and Accounts Payable decreases!",
      solution: [
        { account: "Accounts Payable", debit: 200, credit: 0 },
        { account: "Raw Materials",   debit: 0,   credit: 200 }
      ],
      explanation: "📌 **Debit Accounts Payable $200** (decreasing liabilities), **Credit Raw Materials $200** (decreasing assets)."
    },
    {
      description: "🏙️ Paid $700 in property taxes for the year.",
      hint: "Property Tax Expense increases and Cash decreases!",
      solution: [
        { account: "Property Tax Expense", debit: 700, credit: 0 },
        { account: "Cash",                 debit: 0,   credit: 700 }
      ],
      explanation: "📌 **Debit Property Tax Expense $700** (increasing expenses), **Credit Cash $700** (decreasing assets)."
    },
    {
      description: "🌍 Paid $1,500 to settle foreign exchange losses.",
      hint: "Foreign Exchange Loss increases and Cash decreases!",
      solution: [
        { account: "Foreign Exchange Loss", debit: 1500, credit: 0 },
        { account: "Cash",                  debit: 0,    credit: 1500 }
      ],
      explanation: "📌 **Debit Foreign Exchange Loss $1,500** (increasing expenses), **Credit Cash $1,500** (decreasing assets)."
    },
    {
      description: "🖨️ Purchased a printer for $400, paying $100 in cash and the rest on account.",
      hint: "Equipment increases, Cash decreases, and Accounts Payable increases!",
      solution: [
        { account: "Equipment",       debit: 400, credit: 0 },
        { account: "Cash",            debit: 0,   credit: 100 },
        { account: "Accounts Payable", debit: 0,  credit: 300 }
      ],
      explanation: "📌 **Debit Equipment $400** (increasing assets), **Credit Cash $100** (decreasing assets), **Credit Accounts Payable $300** (increasing liabilities)."
    },
    {
      description: "💼 Provided consulting services worth $5,000, half in cash and half on account.",
      hint: "Cash and Accounts Receivable increase, and Revenue increases!",
      solution: [
        { account: "Cash",              debit: 2500, credit: 0 },
        { account: "Accounts Receivable", debit: 2500, credit: 0 },
        { account: "Revenue",           debit: 0,    credit: 5000 }
      ],
      explanation: "📌 **Debit Cash $2,500** and **Debit Accounts Receivable $2,500** (increasing assets), **Credit Revenue $5,000** (increasing equity)."
    },
    {
      description: "🔄 Issued a refund of $600 for a returned service payment.",
      hint: "Revenue decreases and Cash decreases!",
      solution: [
        { account: "Revenue", debit: 600, credit: 0 },
        { account: "Cash",    debit: 0,   credit: 600 }
      ],
      explanation: "📌 **Debit Revenue $600** (decreasing equity), **Credit Cash $600** (decreasing assets)."
    },
    {
      description: "🚚 Paid $1,000 in freight charges for delivered goods.",
      hint: "Freight Expense increases and Cash decreases!",
      solution: [
        { account: "Freight Expense", debit: 1000, credit: 0 },
        { account: "Cash",            debit: 0,    credit: 1000 }
      ],
      explanation: "📌 **Debit Freight Expense $1,000** (increasing expenses), **Credit Cash $1,000** (decreasing assets)."
    },
    {
      description: "📊 Accrued $500 in interest expense for the month.",
      hint: "Interest Expense increases and Interest Payable increases!",
      solution: [
        { account: "Interest Expense", debit: 500, credit: 0 },
        { account: "Interest Payable", debit: 0,   credit: 500 }
      ],
      explanation: "📌 **Debit Interest Expense $500** (increasing expenses), **Credit Interest Payable $500** (increasing liabilities)."
    },
    {
      description: "🏠 Paid $2,200 for monthly office rent via bank transfer.",
      hint: "Rent Expense increases and Cash decreases!",
      solution: [
        { account: "Rent Expense", debit: 2200, credit: 0 },
        { account: "Cash",         debit: 0,    credit: 2200 }
      ],
      explanation: "📌 **Debit Rent Expense $2,200** (increasing expenses), **Credit Cash $2,200** (decreasing assets)."
    },
    {
      description: "📋 Received $4,500 as an advance payment for a service to be completed later.",
      hint: "Cash increases and Unearned Revenue increases!",
      solution: [
        { account: "Cash",            debit: 4500, credit: 0 },
        { account: "Unearned Revenue", debit: 0,    credit: 4500 }
      ],
      explanation: "📌 **Debit Cash $4,500** (increasing assets), **Credit Unearned Revenue $4,500** (increasing liabilities)."
    },
    {
      description: "👷 Incurred $700 in overtime wages to be paid next payday.",
      hint: "Wages Expense increases and Wages Payable increases!",
      solution: [
        { account: "Wages Expense", debit: 700, credit: 0 },
        { account: "Wages Payable", debit: 0,   credit: 700 }
      ],
      explanation: "📌 **Debit Wages Expense $700** (increasing expenses), **Credit Wages Payable $700** (increasing liabilities)."
    },
    {
      description: "🏢 Received $2,000 rent income for subleasing a portion of the office space.",
      hint: "Cash increases and Rent Income increases!",
      solution: [
        { account: "Cash",       debit: 2000, credit: 0 },
        { account: "Rent Income", debit: 0,   credit: 2000 }
      ],
      explanation: "📌 **Debit Cash $2,000** (increasing assets), **Credit Rent Income $2,000** (increasing equity)."
    },
    {
      description: "🔋 Purchased $800 worth of batteries for resale, paying cash.",
      hint: "Inventory increases and Cash decreases!",
      solution: [
        { account: "Inventory", debit: 800, credit: 0 },
        { account: "Cash",      debit: 0,   credit: 800 }
      ],
      explanation: "📌 **Debit Inventory $800** (increasing assets), **Credit Cash $800** (decreasing assets)."
    },
    {
      description: "📈 Recognized $300 depreciation on office furniture.",
      hint: "Depreciation Expense increases and Accumulated Depreciation increases!",
      solution: [
        { account: "Depreciation Expense", debit: 300, credit: 0 },
        { account: "Accumulated Depreciation", debit: 0, credit: 300 }
      ],
      explanation: "📌 **Debit Depreciation Expense $300** (increasing expenses), **Credit Accumulated Depreciation $300** (increasing contra-assets)."
    },
    {
      description: "🚛 Paid $1,500 for vehicle maintenance.",
      hint: "Vehicle Maintenance Expense increases and Cash decreases!",
      solution: [
        { account: "Vehicle Maintenance Expense", debit: 1500, credit: 0 },
        { account: "Cash",                        debit: 0,    credit: 1500 }
      ],
      explanation: "📌 **Debit Vehicle Maintenance Expense $1,500** (increasing expenses), **Credit Cash $1,500** (decreasing assets)."
    },
    {
      description: "🏪 Paid $600 in utilities via bank transfer.",
      hint: "Utilities Expense increases and Cash decreases!",
      solution: [
        { account: "Utilities Expense", debit: 600, credit: 0 },
        { account: "Cash",              debit: 0,   credit: 600 }
      ],
      explanation: "📌 **Debit Utilities Expense $600** (increasing expenses), **Credit Cash $600** (decreasing assets)."
    },
    {
      description: "📄 Provided a customer discount of $200 on an outstanding invoice.",
      hint: "Revenue decreases and Accounts Receivable decreases!",
      solution: [
        { account: "Revenue", debit: 200, credit: 0 },
        { account: "Accounts Receivable", debit: 0, credit: 200 }
      ],
      explanation: "📌 **Debit Revenue $200** (decreasing equity), **Credit Accounts Receivable $200** (decreasing assets)."
    },
    {
      description: "💳 Paid $1,200 on a company credit card balance.",
      hint: "Credit Card Payable decreases and Cash decreases!",
      solution: [
        { account: "Credit Card Payable", debit: 1200, credit: 0 },
        { account: "Cash",                debit: 0,    credit: 1200 }
      ],
      explanation: "📌 **Debit Credit Card Payable $1,200** (decreasing liabilities), **Credit Cash $1,200** (decreasing assets)."
    },
    {
      description: "📅 Adjusted for $500 of expired prepaid insurance.",
      hint: "Insurance Expense increases and Prepaid Insurance decreases!",
      solution: [
        { account: "Insurance Expense", debit: 500, credit: 0 },
        { account: "Prepaid Insurance", debit: 0,   credit: 500 }
      ],
      explanation: "📌 **Debit Insurance Expense $500** (increasing expenses), **Credit Prepaid Insurance $500** (decreasing assets)."
    },
    {
      description: "🏢 Collected $1,800 from customers for outstanding invoices.",
      hint: "Cash increases and Accounts Receivable decreases!",
      solution: [
        { account: "Cash",              debit: 1800, credit: 0 },
        { account: "Accounts Receivable", debit: 0, credit: 1800 }
      ],
      explanation: "📌 **Debit Cash $1,800** (increasing assets), **Credit Accounts Receivable $1,800** (decreasing assets)."
    },
    {
      description: "📈 Recorded $600 in accrued taxes payable.",
      hint: "Taxes Expense increases and Taxes Payable increases!",
      solution: [
        { account: "Taxes Expense", debit: 600, credit: 0 },
        { account: "Taxes Payable", debit: 0,   credit: 600 }
      ],
      explanation: "📌 **Debit Taxes Expense $600** (increasing expenses), **Credit Taxes Payable $600** (increasing liabilities)."
    },
    {
      description: "📋 Earned $3,000 in service revenue, to be paid later.",
      hint: "Accounts Receivable increases and Revenue increases!",
      solution: [
        { account: "Accounts Receivable", debit: 3000, credit: 0 },
        { account: "Revenue",             debit: 0,    credit: 3000 }
      ],
      explanation: "📌 **Debit Accounts Receivable $3,000** (increasing assets), **Credit Revenue $3,000** (increasing equity)."
    },
    {
      description: "📦 Returned $400 of unused supplies to the vendor for a refund.",
      hint: "Supplies decrease and Cash increases!",
      solution: [
        { account: "Cash",     debit: 400, credit: 0 },
        { account: "Supplies", debit: 0,   credit: 400 }
      ],
      explanation: "📌 **Debit Cash $400** (increasing assets), **Credit Supplies $400** (decreasing assets)."
    },
    {
      description: "📤 Donated $1,000 to a local charity in cash.",
      hint: "Charitable Donations Expense increases and Cash decreases!",
      solution: [
        { account: "Charitable Donations Expense", debit: 1000, credit: 0 },
        { account: "Cash",                         debit: 0,    credit: 1000 }
      ],
      explanation: "📌 **Debit Charitable Donations Expense $1,000** (increasing expenses), **Credit Cash $1,000** (decreasing assets)."
    },
    {
      description: "🔄 Converted $800 of accounts payable into a long-term loan.",
      hint: "Accounts Payable decreases and Loans Payable increases!",
      solution: [
        { account: "Accounts Payable", debit: 800, credit: 0 },
        { account: "Loans Payable",    debit: 0,   credit: 800 }
      ],
      explanation: "📌 **Debit Accounts Payable $800** (decreasing liabilities), **Credit Loans Payable $800** (increasing liabilities)."
    },
    {
      description: "🖊️ Paid $500 to renew a software subscription for the next year.",
      hint: "Prepaid Software Subscription increases and Cash decreases!",
      solution: [
        { account: "Prepaid Software Subscription", debit: 500, credit: 0 },
        { account: "Cash",                          debit: 0,   credit: 500 }
      ],
      explanation: "📌 **Debit Prepaid Software Subscription $500** (increasing assets), **Credit Cash $500** (decreasing assets)."
    },
    {
      description: "🛒 Purchased office supplies worth $250 on account.",
      hint: "Supplies increase and Accounts Payable increases!",
      solution: [
        { account: "Supplies",         debit: 250, credit: 0 },
        { account: "Accounts Payable", debit: 0,   credit: 250 }
      ],
      explanation: "📌 **Debit Supplies $250** (increasing assets), **Credit Accounts Payable $250** (increasing liabilities)."
    },
    {
      description: "📢 Paid $300 for online advertisements using a credit card.",
      hint: "Marketing Expense increases and Credit Card Payable increases!",
      solution: [
        { account: "Marketing Expense", debit: 300, credit: 0 },
        { account: "Credit Card Payable", debit: 0, credit: 300 }
      ],
      explanation: "📌 **Debit Marketing Expense $300** (increasing expenses), **Credit Credit Card Payable $300** (increasing liabilities)."
    },
    {
      description: "📊 Adjusted for $200 of expired prepaid rent.",
      hint: "Rent Expense increases and Prepaid Rent decreases!",
      solution: [
        { account: "Rent Expense", debit: 200, credit: 0 },
        { account: "Prepaid Rent", debit: 0,   credit: 200 }
      ],
      explanation: "📌 **Debit Rent Expense $200** (increasing expenses), **Credit Prepaid Rent $200** (decreasing assets)."
    },
    {
      description: "🚚 Paid $400 in delivery charges for customer shipments.",
      hint: "Delivery Expense increases and Cash decreases!",
      solution: [
        { account: "Delivery Expense", debit: 400, credit: 0 },
        { account: "Cash",             debit: 0,   credit: 400 }
      ],
      explanation: "📌 **Debit Delivery Expense $400** (increasing expenses), **Credit Cash $400** (decreasing assets)."
    },
    {
      description: "📦 Purchased $2,000 of inventory, paid half in cash and half on account.",
      hint: "Inventory increases, Cash decreases, and Accounts Payable increases!",
      solution: [
        { account: "Inventory",        debit: 2000, credit: 0 },
        { account: "Cash",             debit: 0,    credit: 1000 },
        { account: "Accounts Payable", debit: 0,    credit: 1000 }
      ],
      explanation: "📌 **Debit Inventory $2,000** (increasing assets), **Credit Cash $1,000** (decreasing assets), **Credit Accounts Payable $1,000** (increasing liabilities)."
    },
    {
      description: "📈 Earned $2,500 in revenue for consulting services, paid in cash.",
      hint: "Cash increases and Revenue increases!",
      solution: [
        { account: "Cash",    debit: 2500, credit: 0 },
        { account: "Revenue", debit: 0,    credit: 2500 }
      ],
      explanation: "📌 **Debit Cash $2,500** (increasing assets), **Credit Revenue $2,500** (increasing equity)."
    },
    {
      description: "🏢 Paid $1,200 for building maintenance.",
      hint: "Maintenance Expense increases and Cash decreases!",
      solution: [
        { account: "Maintenance Expense", debit: 1200, credit: 0 },
        { account: "Cash",                debit: 0,    credit: 1200 }
      ],
      explanation: "📌 **Debit Maintenance Expense $1,200** (increasing expenses), **Credit Cash $1,200** (decreasing assets)."
    },
    {
      description: "📅 Paid $2,000 for insurance covering the next six months.",
      hint: "Prepaid Insurance increases and Cash decreases!",
      solution: [
        { account: "Prepaid Insurance", debit: 2000, credit: 0 },
        { account: "Cash",              debit: 0,    credit: 2000 }
      ],
      explanation: "📌 **Debit Prepaid Insurance $2,000** (increasing assets), **Credit Cash $2,000** (decreasing assets)."
    },
    {
      description: "🔧 Paid $1,000 for equipment repairs.",
      hint: "Repair Expense increases and Cash decreases!",
      solution: [
        { account: "Repair Expense", debit: 1000, credit: 0 },
        { account: "Cash",           debit: 0,    credit: 1000 }
      ],
      explanation: "📌 **Debit Repair Expense $1,000** (increasing expenses), **Credit Cash $1,000** (decreasing assets)."
    },
    {
      description: "🏦 Made a loan payment of $1,500, with $1,200 toward principal and $300 as interest.",
      hint: "Loans Payable and Interest Expense increase, while Cash decreases!",
      solution: [
        { account: "Loans Payable",    debit: 1200, credit: 0 },
        { account: "Interest Expense", debit: 300, credit: 0 },
        { account: "Cash",             debit: 0,    credit: 1500 }
      ],
      explanation: "📌 **Debit Loans Payable $1,200** (decreasing liabilities), **Debit Interest Expense $300** (increasing expenses), **Credit Cash $1,500** (decreasing assets)."
    },
    {
      description: "📈 Earned $4,000 in sales, half in cash and half on account.",
      hint: "Cash and Accounts Receivable increase, and Revenue increases!",
      solution: [
        { account: "Cash",              debit: 2000, credit: 0 },
        { account: "Accounts Receivable", debit: 2000, credit: 0 },
        { account: "Revenue",           debit: 0,    credit: 4000 }
      ],
      explanation: "📌 **Debit Cash $2,000** and **Debit Accounts Receivable $2,000** (increasing assets), **Credit Revenue $4,000** (increasing equity)."
    },
    {
      description: "📤 Issued a $500 refund to a customer for a returned product.",
      hint: "Revenue decreases and Cash decreases!",
      solution: [
        { account: "Revenue", debit: 500, credit: 0 },
        { account: "Cash",    debit: 0,   credit: 500 }
      ],
      explanation: "📌 **Debit Revenue $500** (decreasing equity), **Credit Cash $500** (decreasing assets)."
    },
    {
      description: "🏢 Paid $3,000 for a quarterly rent expense.",
      hint: "Rent Expense increases and Cash decreases!",
      solution: [
        { account: "Rent Expense", debit: 3000, credit: 0 },
        { account: "Cash",         debit: 0,    credit: 3000 }
      ],
      explanation: "📌 **Debit Rent Expense $3,000** (increasing expenses), **Credit Cash $3,000** (decreasing assets)."
    },
    {
      description: "📊 Recognized $1,500 in depreciation for the month.",
      hint: "Depreciation Expense increases and Accumulated Depreciation increases!",
      solution: [
        { account: "Depreciation Expense", debit: 1500, credit: 0 },
        { account: "Accumulated Depreciation", debit: 0, credit: 1500 }
      ],
      explanation: "📌 **Debit Depreciation Expense $1,500** (increasing expenses), **Credit Accumulated Depreciation $1,500** (increasing contra-assets)."
    },
    {
      description: "📋 Accrued $800 in employee bonuses.",
      hint: "Bonus Expense increases and Bonus Payable increases!",
      solution: [
        { account: "Bonus Expense", debit: 800, credit: 0 },
        { account: "Bonus Payable", debit: 0,   credit: 800 }
      ],
      explanation: "📌 **Debit Bonus Expense $800** (increasing expenses), **Credit Bonus Payable $800** (increasing liabilities)."
    },
    {
      description: "📦 Purchased $1,200 worth of inventory on credit.",
      hint: "Inventory increases and Accounts Payable increases!",
      solution: [
        { account: "Inventory",        debit: 1200, credit: 0 },
        { account: "Accounts Payable", debit: 0,    credit: 1200 }
      ],
      explanation: "📌 **Debit Inventory $1,200** (increasing assets), **Credit Accounts Payable $1,200** (increasing liabilities)."
    },
    {
      description: "📈 Earned $6,000 in service revenue, to be paid in 30 days.",
      hint: "Accounts Receivable increases and Revenue increases!",
      solution: [
        { account: "Accounts Receivable", debit: 6000, credit: 0 },
        { account: "Revenue",             debit: 0,    credit: 6000 }
      ],
      explanation: "📌 **Debit Accounts Receivable $6,000** (increasing assets), **Credit Revenue $6,000** (increasing equity)."
    },
    {
      description: "🏦 Secured a $10,000 bank loan and deposited it in the business account.",
      hint: "Cash increases and Loans Payable increases!",
      solution: [
        { account: "Cash",         debit: 10000, credit: 0 },
        { account: "Loans Payable", debit: 0,    credit: 10000 }
      ],
      explanation: "📌 **Debit Cash $10,000** (increasing assets), **Credit Loans Payable $10,000** (increasing liabilities)."
    },
    {
      description: "📤 Paid $2,500 for an office renovation.",
      hint: "Renovation Expense increases and Cash decreases!",
      solution: [
        { account: "Renovation Expense", debit: 2500, credit: 0 },
        { account: "Cash",               debit: 0,    credit: 2500 }
      ],
      explanation: "📌 **Debit Renovation Expense $2,500** (increasing expenses), **Credit Cash $2,500** (decreasing assets)."
    },
    {
      description: "📄 Recorded $1,200 as interest income from investments.",
      hint: "Interest Income increases and Cash increases!",
      solution: [
        { account: "Cash",           debit: 1200, credit: 0 },
        { account: "Interest Income", debit: 0,   credit: 1200 }
      ],
      explanation: "📌 **Debit Cash $1,200** (increasing assets), **Credit Interest Income $1,200** (increasing equity)."
    },
    {
      description: "📦 Returned $500 of defective inventory to the supplier.",
      hint: "Inventory decreases and Accounts Payable decreases!",
      solution: [
        { account: "Accounts Payable", debit: 500, credit: 0 },
        { account: "Inventory",        debit: 0,   credit: 500 }
      ],
      explanation: "📌 **Debit Accounts Payable $500** (decreasing liabilities), **Credit Inventory $500** (decreasing assets)."
    },
    {
      description: "📋 Earned $3,000 in consulting fees, to be received later.",
      hint: "Accounts Receivable increases and Revenue increases!",
      solution: [
        { account: "Accounts Receivable", debit: 3000, credit: 0 },
        { account: "Revenue",             debit: 0,    credit: 3000 }
      ],
      explanation: "📌 **Debit Accounts Receivable $3,000** (increasing assets), **Credit Revenue $3,000** (increasing equity)."
    },
    {
      description: "💸 Declared dividends of $2,000, to be paid next month.",
      hint: "Retained Earnings decreases and Dividends Payable increases!",
      solution: [
        { account: "Retained Earnings", debit: 2000, credit: 0 },
        { account: "Dividends Payable", debit: 0,    credit: 2000 }
      ],
      explanation: "📌 **Debit Retained Earnings $2,000** (decreasing equity), **Credit Dividends Payable $2,000** (increasing liabilities)."
    },
    {
      description: "🏠 Paid $1,500 for cleaning services.",
      hint: "Cleaning Expense increases and Cash decreases!",
      solution: [
        { account: "Cleaning Expense", debit: 1500, credit: 0 },
        { account: "Cash",             debit: 0,    credit: 1500 }
      ],
      explanation: "📌 **Debit Cleaning Expense $1,500** (increasing expenses), **Credit Cash $1,500** (decreasing assets)."
    },
    {
      description: "🔄 Converted $2,000 of Accounts Receivable to Notes Receivable.",
      hint: "Accounts Receivable decreases and Notes Receivable increases!",
      solution: [
        { account: "Notes Receivable", debit: 2000, credit: 0 },
        { account: "Accounts Receivable", debit: 0, credit: 2000 }
      ],
      explanation: "📌 **Debit Notes Receivable $2,000** (increasing assets), **Credit Accounts Receivable $2,000** (decreasing assets)."
    },
    {
      description: "📢 Paid $800 for a social media ad campaign.",
      hint: "Advertising Expense increases and Cash decreases!",
      solution: [
        { account: "Advertising Expense", debit: 800, credit: 0 },
        { account: "Cash",                debit: 0,   credit: 800 }
      ],
      explanation: "📌 **Debit Advertising Expense $800** (increasing expenses), **Credit Cash $800** (decreasing assets)."
    },
    {
      description: "📑 Paid $1,200 in legal fees for contract review.",
      hint: "Legal Expense increases and Cash decreases!",
      solution: [
        { account: "Legal Expense", debit: 1200, credit: 0 },
        { account: "Cash",          debit: 0,    credit: 1200 }
      ],
      explanation: "📌 **Debit Legal Expense $1,200** (increasing expenses), **Credit Cash $1,200** (decreasing assets)."
    },
    {
      description: "📦 Purchased $2,500 worth of merchandise inventory, paid entirely in cash.",
      hint: "Inventory increases and Cash decreases!",
      solution: [
        { account: "Inventory", debit: 2500, credit: 0 },
        { account: "Cash",      debit: 0,    credit: 2500 }
      ],
      explanation: "📌 **Debit Inventory $2,500** (increasing assets), **Credit Cash $2,500** (decreasing assets)."
    },
    {
      description: "🏪 Paid $1,000 in utilities for the office.",
      hint: "Utilities Expense increases and Cash decreases!",
      solution: [
        { account: "Utilities Expense", debit: 1000, credit: 0 },
        { account: "Cash",              debit: 0,    credit: 1000 }
      ],
      explanation: "📌 **Debit Utilities Expense $1,000** (increasing expenses), **Credit Cash $1,000** (decreasing assets)."
    },
    {
      description: "📋 Accrued $800 in property taxes for the month.",
      hint: "Property Tax Expense increases and Property Tax Payable increases!",
      solution: [
        { account: "Property Tax Expense", debit: 800, credit: 0 },
        { account: "Property Tax Payable", debit: 0,   credit: 800 }
      ],
      explanation: "📌 **Debit Property Tax Expense $800** (increasing expenses), **Credit Property Tax Payable $800** (increasing liabilities)."
    },
    {
      description: "🔧 Paid $500 for maintenance of company machinery.",
      hint: "Maintenance Expense increases and Cash decreases!",
      solution: [
        { account: "Maintenance Expense", debit: 500, credit: 0 },
        { account: "Cash",                debit: 0,   credit: 500 }
      ],
      explanation: "📌 **Debit Maintenance Expense $500** (increasing expenses), **Credit Cash $500** (decreasing assets)."
    },
    {
      description: "📑 Recorded $1,200 in accrued legal fees.",
      hint: "Legal Expense increases and Legal Fees Payable increases!",
      solution: [
        { account: "Legal Expense",       debit: 1200, credit: 0 },
        { account: "Legal Fees Payable",  debit: 0,    credit: 1200 }
      ],
      explanation: "📌 **Debit Legal Expense $1,200** (increasing expenses), **Credit Legal Fees Payable $1,200** (increasing liabilities)."
    },
    {
      description: "📈 Earned $7,000 in revenue for services, half in cash and half on account.",
      hint: "Cash and Accounts Receivable increase, and Revenue increases!",
      solution: [
        { account: "Cash",               debit: 3500, credit: 0 },
        { account: "Accounts Receivable", debit: 3500, credit: 0 },
        { account: "Revenue",            debit: 0,    credit: 7000 }
      ],
      explanation: "📌 **Debit Cash $3,500** and **Debit Accounts Receivable $3,500** (increasing assets), **Credit Revenue $7,000** (increasing equity)."
    },
    {
      description: "🏠 Paid $3,200 for building rent for the month.",
      hint: "Rent Expense increases and Cash decreases!",
      solution: [
        { account: "Rent Expense", debit: 3200, credit: 0 },
        { account: "Cash",         debit: 0,    credit: 3200 }
      ],
      explanation: "📌 **Debit Rent Expense $3,200** (increasing expenses), **Credit Cash $3,200** (decreasing assets)."
    },
    {
      description: "📤 Refunded $1,000 to a customer for a canceled service.",
      hint: "Revenue decreases and Cash decreases!",
      solution: [
        { account: "Revenue", debit: 1000, credit: 0 },
        { account: "Cash",    debit: 0,    credit: 1000 }
      ],
      explanation: "📌 **Debit Revenue $1,000** (decreasing equity), **Credit Cash $1,000** (decreasing assets)."
    },
    {
      description: "📦 Returned $300 worth of inventory to the supplier and received a credit.",
      hint: "Inventory decreases and Accounts Payable decreases!",
      solution: [
        { account: "Accounts Payable", debit: 300, credit: 0 },
        { account: "Inventory",        debit: 0,   credit: 300 }
      ],
      explanation: "📌 **Debit Accounts Payable $300** (decreasing liabilities), **Credit Inventory $300** (decreasing assets)."
    },
    {
      description: "📊 Adjusted for $500 of bad debts from accounts receivable.",
      hint: "Bad Debt Expense increases and Accounts Receivable decreases!",
      solution: [
        { account: "Bad Debt Expense",  debit: 500, credit: 0 },
        { account: "Accounts Receivable", debit: 0, credit: 500 }
      ],
      explanation: "📌 **Debit Bad Debt Expense $500** (increasing expenses), **Credit Accounts Receivable $500** (decreasing assets)."
    },
    {
      description: "🔧 Paid $1,000 for equipment servicing.",
      hint: "Servicing Expense increases and Cash decreases!",
      solution: [
        { account: "Servicing Expense", debit: 1000, credit: 0 },
        { account: "Cash",              debit: 0,    credit: 1000 }
      ],
      explanation: "📌 **Debit Servicing Expense $1,000** (increasing expenses), **Credit Cash $1,000** (decreasing assets)."
    },
    {
      description: "📈 Earned $5,000 in revenue, paid entirely in cash.",
      hint: "Cash increases and Revenue increases!",
      solution: [
        { account: "Cash",    debit: 5000, credit: 0 },
        { account: "Revenue", debit: 0,    credit: 5000 }
      ],
      explanation: "📌 **Debit Cash $5,000** (increasing assets), **Credit Revenue $5,000** (increasing equity)."
    },
    {
      description: "📦 Recorded $600 in shrinkage losses for inventory.",
      hint: "Shrinkage Expense increases and Inventory decreases!",
      solution: [
        { account: "Shrinkage Expense", debit: 600, credit: 0 },
        { account: "Inventory",         debit: 0,   credit: 600 }
      ],
      explanation: "📌 **Debit Shrinkage Expense $600** (increasing expenses), **Credit Inventory $600** (decreasing assets)."
    },
    {
      description: "📋 Accrued $900 for employee benefits payable.",
      hint: "Employee Benefits Expense increases and Employee Benefits Payable increases!",
      solution: [
        { account: "Employee Benefits Expense", debit: 900, credit: 0 },
        { account: "Employee Benefits Payable", debit: 0,   credit: 900 }
      ],
      explanation: "📌 **Debit Employee Benefits Expense $900** (increasing expenses), **Credit Employee Benefits Payable $900** (increasing liabilities)."
    },
    {
      description: "📑 Recognized $700 in interest payable for the month.",
      hint: "Interest Expense increases and Interest Payable increases!",
      solution: [
        { account: "Interest Expense", debit: 700, credit: 0 },
        { account: "Interest Payable", debit: 0,   credit: 700 }
      ],
      explanation: "📌 **Debit Interest Expense $700** (increasing expenses), **Credit Interest Payable $700** (increasing liabilities)."
    },
    {
      description: "🏢 Paid $1,800 for office furniture using cash.",
      hint: "Furniture increases and Cash decreases!",
      solution: [
        { account: "Furniture", debit: 1800, credit: 0 },
        { account: "Cash",      debit: 0,    credit: 1800 }
      ],
      explanation: "📌 **Debit Furniture $1,800** (increasing assets), **Credit Cash $1,800** (decreasing assets)."
    },
    {
      description: "📦 Purchased $3,000 of inventory on credit.",
      hint: "Inventory increases and Accounts Payable increases!",
      solution: [
        { account: "Inventory",        debit: 3000, credit: 0 },
        { account: "Accounts Payable", debit: 0,    credit: 3000 }
      ],
      explanation: "📌 **Debit Inventory $3,000** (increasing assets), **Credit Accounts Payable $3,000** (increasing liabilities)."
    },
    {
      description: "🏠 Paid $2,500 in cash for rent expense.",
      hint: "Rent Expense increases and Cash decreases!",
      solution: [
        { account: "Rent Expense", debit: 2500, credit: 0 },
        { account: "Cash",         debit: 0,    credit: 2500 }
      ],
      explanation: "📌 **Debit Rent Expense $2,500** (increasing expenses), **Credit Cash $2,500** (decreasing assets)."
    },
    {
      description: "📈 Collected $4,000 from a customer for a previous credit sale.",
      hint: "Cash increases and Accounts Receivable decreases!",
      solution: [
        { account: "Cash",              debit: 4000, credit: 0 },
        { account: "Accounts Receivable", debit: 0, credit: 4000 }
      ],
      explanation: "📌 **Debit Cash $4,000** (increasing assets), **Credit Accounts Receivable $4,000** (decreasing assets)."
    },
    {
      description: "💸 Paid $1,000 in cash to settle a portion of accounts payable.",
      hint: "Accounts Payable decreases and Cash decreases!",
      solution: [
        { account: "Accounts Payable", debit: 1000, credit: 0 },
        { account: "Cash",             debit: 0,    credit: 1000 }
      ],
      explanation: "📌 **Debit Accounts Payable $1,000** (decreasing liabilities), **Credit Cash $1,000** (decreasing assets)."
    }
  ];
  
  ////////////////////////////////////////////////////////
  // 2. PICK 10 RANDOM SCENARIOS WHEN THE PAGE LOADS
  ////////////////////////////////////////////////////////
  function getRandomScenarios(count) {
    const shuffled = [...allScenarios].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
  
  // Our code expects `scenarios` to exist. Let's pick 10:
  const scenarios = getRandomScenarios(10);
  
  
  // State variables
  let currentTransactionIndex = 0;
  let isJournalCorrect = false;
  let isTAccountCorrect = false;
  let isTrialBalanceCorrect = false;
  
  // Holds the user's running account balances after each transaction
  let accountBalances = {};
  
  // Used for storing the latest T-Account and TB HTML states
  let lastTAccountsHTML = "";
  let lastTBHTML = "";
  let startTAccountsHTML = "";
  let startTBHTML = "";
  
  // Track used accounts for each tab
  let journalUsedAccounts = new Set();
  let tAccountUsedAccounts = new Set();
  let trialBalanceUsedAccounts = new Set();
  
  /**
   * Initialize the page on window load by loading the first transaction,
   * setting up the Journal Entries, and preparing the Trial Balance UI.
   */
  window.onload = function() {
    loadTransaction();
    resetJournalEntry();
    renderTrialBalanceRows();
    document.addEventListener('click', closeAllDropdowns);
  };
  
  /**
   * Loads the current transaction details (description, number) into the UI.
   * Resets correctness checks and toggles the "Next Transaction" button.
   */
  function loadTransaction() {
    const txNum = currentTransactionIndex + 1;
    document.getElementById('transactionNumber').innerHTML = txNum;
    document.getElementById('transactionDesc').innerHTML =
        scenarios[currentTransactionIndex].description;
  
    isJournalCorrect = false;
    isTAccountCorrect = false;
    isTrialBalanceCorrect = false;
    document.getElementById('nextBtn').disabled = true;
  
    startTAccountsHTML = lastTAccountsHTML;
    startTBHTML        = lastTBHTML;
  }
  
  /**
   * Displays a hint for the current transaction in an alert box.
   */
  function showHint() {
    alert(scenarios[currentTransactionIndex].hint);
  }
  
  /**
   * Checks if all three sections (Journal, T-Account, Trial Balance) are marked correct.
   * If so, enables the "Next Transaction" button and shows a final congrats alert.
   */
  function checkAllCorrectness() {
    if (isJournalCorrect && isTAccountCorrect && isTrialBalanceCorrect) {
      document.getElementById('nextBtn').disabled = false;
      setTimeout(() => {
        if (currentTransactionIndex < 9) {
          alert("🎉 Congratulations! You've successfully completed this transaction! You can now move to the next one.");
        } else if (currentTransactionIndex === 9) {
          alert("🎊 Fantastic work! You've mastered all transactions. Keep up the great learning!");
        }
      }, 100);
    } else {
      document.getElementById('nextBtn').disabled = true;
    }
  }
  
  /**
   * Applies the solution for the current transaction to the running account balances,
   * locks the previous T-Account entries, then moves on to the next scenario if available.
   */
  function goToNextTransaction() {
    applyScenarioToBalances(scenarios[currentTransactionIndex].solution);
    lockPreviousTAccountEntries();
  
    const tAccountContainer = document.getElementById('tAccountContainer');
    const tbRowsContainer   = document.getElementById('trialBalanceRows');
    lastTAccountsHTML = tAccountContainer.innerHTML;
    lastTBHTML        = tbRowsContainer.innerHTML;
  
    currentTransactionIndex++;
    if (currentTransactionIndex >= scenarios.length) {
      alert("🎊 All transactions are completed! Fantastic work! If you wish to practice more, refresh the page to load 10 more challenges!");
      document.getElementById('nextBtn').disabled = true;
      return;
    }
  
    loadTransaction();
    resetJournalEntry();
    clearResultMessages();
  
    // Switch back to Journal Entries tab by default
    const journalTab = document.querySelector('.tab-container .tab');
    if (journalTab) {
      openTab('journal', journalTab);
    }
  }
  
  /**
   * Adds debit or credit amounts from the transaction's solution to accountBalances.
   * @param {Array} solutionLines - The solution lines for the current transaction.
   */
  function applyScenarioToBalances(solutionLines) {
    solutionLines.forEach(line => {
      const acc = line.account.toLowerCase();
      if (!accountBalances[acc]) accountBalances[acc] = 0;
      if (line.debit > 0) {
        accountBalances[acc] += line.debit;
      } else {
        accountBalances[acc] -= line.credit;
      }
    });
  }
  
  /**
   * Clears the messages from the Journal, T-Account, and Trial Balance result containers.
   */
  function clearResultMessages() {
    const jr  = document.getElementById('journalResult');
    const tr  = document.getElementById('tAccountResult');
    const tbr = document.getElementById('trialBalanceResult');
  
    jr.style.display  = 'none';  jr.className  = '';  jr.innerHTML  = '';
    tr.style.display  = 'none';  tr.className  = '';  tr.innerHTML  = '';
    tbr.style.display = 'none';  tbr.className = '';  tbr.innerHTML = '';
  }
  
  /**
   * Toggles a dropright menu, preventing event propagation.
   * @param {Event} event - The click event.
   * @param {HTMLElement} btn - The button that triggers the dropdown.
   */
  function toggleDroprightContent(event, btn) {
    event.stopPropagation();
    const parent = btn.parentNode;
    const content = parent.querySelector('.dropright-content');
    if (!content) return;
    content.style.display = (content.style.display === 'block') ? 'none' : 'block';
  }
  
  /**
   * Closes all dropdowns when clicking anywhere outside the menu.
   */
  function closeAllDropdowns() {
    const dropdowns = document.getElementsByClassName('dropright-content');
    for (let i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.style.display === 'block') {
        openDropdown.style.display = 'none';
      }
    }
  }
  
  /**
   * Creates the HTML for a dropright menu containing account categories.
   * @param {string} className - Either "journalAccount", "title-select", or "tbAccountName".
   * @returns {string} HTML string for the dropright menu.
   */
  function createAccountDroprightHTML(className) {
    const categories = {
        "Assets": [
          "Cash", "Accounts Receivable", "Inventory", "Supplies", "Prepaid Insurance",
          "Equipment", "Raw Materials", "Furniture", "Notes Receivable", "Prepaid Lease Expense",
          "Prepaid Rent", "Prepaid Software Subscription", "Tools"
        ],
        "Liabilities": [
          "Accounts Payable", "Notes Payable", "Unearned Revenue", "Taxes Payable", 
          "Salary Payable", "Credit Card Payable", "Interest Payable", "Wages Payable", "Loans Payable",
          "Employee Benefits Payable", "Legal Fees Payable", "Bonus Payable", "Property Tax Payable","Dividends Payable"
        ],
        "Equity": [
          "Capital", "Retained Earnings", "Dividends", "Revenue","Cost of Goods Sold",
          "Rent Expense", "Salary Expense","Wages Expense", "Utilities Expense", "Marketing Expense",
          "Insurance Expense", "Interest Income", "Interest Expense", "Accumulated Depreciation",
          "Depreciation Expense", "Bad Debt Expense", "Bonus Expense", "Charitable Donations Expense",
          "Cleaning Expense", "Delivery Expense", "Employee Benefits Expense", "Freight Expense",
          "Legal Expense", "Maintenance Expense","Vehicle Maintenance Expense", "Property Tax Expense", "Repair Expense",
          "Servicing Expense", "Shrinkage Expense",
          "Sales Revenue", "Foreign Exchange Loss", "Rent Income", "Renovation Expense",
          "Advertising Expense", "Common Stock"
        ]
      };
      
      
    
  
    let html = `
      <div class="dropright ${className}">
        <button class="dropbtn" onclick="toggleDroprightContent(event, this)">Select Account</button>
        <input type="hidden" class="${className}Value" value="" />
        <div class="dropright-content">
    `;
  
    for (let category in categories) {
      html += `
        <div class="submenu">
          <button>${category}</button>
          <div class="submenu-content">
      `;
      categories[category].forEach(acc => {
        let skip = false;
        if (className === "journalAccount" && journalUsedAccounts.has(acc)) {
          skip = true;
        } else if (className === "title-select" && tAccountUsedAccounts.has(acc)) {
          skip = true;
        } else if (className === "tbAccountName" && trialBalanceUsedAccounts.has(acc)) {
          skip = true;
        }
  
        if (!skip) {
          html += `<div class="menu-item" data-value="${acc}">${acc}</div>`;
        }
      });
      html += `
          </div>
        </div>
      `;
    }
  
    html += `
        </div>
      </div>
    `;
    return html;
  }
  
  /* =========================
     JOURNAL ENTRIES FUNCTIONS
     ========================= */
  
  /**
   * Adds a new row to the Journal Entries section for selecting an account and entering debit/credit.
   */
  function addJournalRow() {
    const container = document.getElementById('journalEntries');
    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.alignItems = 'center';
    row.style.marginBottom = '20px';
    row.innerHTML = `
      ${createAccountDroprightHTML("journalAccount")}
      <input type="number" class="journalDebit" placeholder="Debit ($)">
      <input type="number" class="journalCredit" placeholder="Credit ($)">
    `;
    container.appendChild(row);
  
    // Attach event listeners for each new row's menu items
    const menuItems = row.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const val = item.getAttribute('data-value');
        const btn = row.querySelector('.dropbtn');
        const hidden = row.querySelector('.journalAccountValue');
        const droprightContent = row.querySelector('.dropright-content');
  
        hidden.value = val;
        btn.textContent = val;
        droprightContent.style.display = 'none';
  
        journalUsedAccounts.add(val);
      });
    });
  }
  
  /**
   * Clears all rows in the Journal Entries section and re-adds two empty rows.
   * Also resets the result block and correctness check for the journal.
   */
  function resetJournalEntry() {
    journalUsedAccounts.clear();
    const container = document.getElementById('journalEntries');
    container.innerHTML = '';
    addJournalRow();
    addJournalRow();
  
    const jr = document.getElementById('journalResult');
    jr.style.display = 'none';
    jr.className = '';
    jr.innerHTML = '';
  
    isJournalCorrect = false;
    checkAllCorrectness();
  }
  
  /**
   * Validates the user's journal entries by comparing them against the current scenario's solution.
   * Checks if Debits == Credits and if each line matches the solution's accounts and amounts.
   */
  function checkJournalEntry() {
    const jr = document.getElementById('journalResult');
    jr.style.display = 'block';
    jr.className = '';
    jr.innerHTML = '';
  
    const rows = document.querySelectorAll('#journalEntries > div');
    let entries = [];
  
    rows.forEach(row => {
      const hiddenAcc = row.querySelector('.journalAccountValue');
      const debitEl   = row.querySelector('.journalDebit');
      const creditEl  = row.querySelector('.journalCredit');
  
      if (!hiddenAcc) return;
      const acc  = (hiddenAcc.value || '').toLowerCase();
      const deb  = parseFloat(debitEl.value) || 0;
      const cred = parseFloat(creditEl.value) || 0;
      if (acc || deb || cred) {
        entries.push({ account: acc, debit: deb, credit: cred });
      }
    });
  
    const totalDeb  = entries.reduce((s, e) => s + e.debit, 0);
    const totalCred = entries.reduce((s, e) => s + e.credit, 0);
  
    // Check if total debits match total credits
    if (totalDeb !== totalCred) {
      jr.classList.add('incorrect-block');
      jr.innerHTML = `
        <h3>❌ Debits and Credits are not equal!</h3>
        <p>Total Debits: $${totalDeb.toFixed(2)}, Total Credits: $${totalCred.toFixed(2)}</p>
      `;
      isJournalCorrect = false;
      checkAllCorrectness();
      return;
    }
  
    // Compare user entries to solution
    const scenarioSol = scenarios[currentTransactionIndex].solution;
    const allCorrect = scenarioSol.every(sol => {
      return entries.some(e =>
        e.account === sol.account.toLowerCase() &&
        e.debit === sol.debit &&
        e.credit === sol.credit
      );
    });
  
    if (allCorrect) {
      jr.classList.add('correct-block');
      jr.innerHTML = `
        <h3>✅ Correct!</h3>
        <p>Your journal entries match <strong>Transaction ${currentTransactionIndex + 1}</strong>.</p>
        <p>${scenarios[currentTransactionIndex].explanation}</p>
      `;
      isJournalCorrect = true;
    } else {
      jr.classList.add('incorrect-block');
      jr.innerHTML = `
        <h3>❌ Not quite right.</h3>
        <p>Double-check your debits and credits for each account.</p>
        <p>${scenarios[currentTransactionIndex].explanation}</p>
      `;
      isJournalCorrect = false;
    }
  
    checkAllCorrectness();
  }
  
  /* =========================
     T-ACCOUNTS FUNCTIONS
     ========================= */
  
  /**
   * Creates a new T-Account element and adds it to the T-Account container.
   */
  function addTAccount() {
    const container = document.getElementById('tAccountContainer');
    const tAcc = createTAccountElement();
    container.appendChild(tAcc);
  }
  
  /**
   * Builds the T-Account HTML structure (title, debit and credit columns) along with dropdowns.
   * @returns {HTMLElement} A fully constructed "t-account" div element.
   */
  function createTAccountElement() {
    const tAccount = document.createElement('div');
    tAccount.className = 't-account';
  
    const titleDiv = document.createElement('div');
    titleDiv.className = 't-title';
    titleDiv.innerHTML = createAccountDroprightHTML("title-select");
    tAccount.appendChild(titleDiv);
  
    // Delay attaching events to ensure the DOM is fully rendered
    setTimeout(() => {
      const menuItems = titleDiv.querySelectorAll('.menu-item');
      const btn       = titleDiv.querySelector('.dropbtn');
      const hidden    = titleDiv.querySelector('.title-selectValue');
      const content   = titleDiv.querySelector('.dropright-content');
  
      menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
          e.stopPropagation();
          const val = item.getAttribute('data-value');
          hidden.value = val;
          btn.textContent = val.toUpperCase();
          content.style.display = 'none';
  
          tAccountUsedAccounts.add(val);
        });
      });
    }, 10);
  
    const tBody = document.createElement('div');
    tBody.className = 't-body';
  
    const debitCol = document.createElement('div');
    debitCol.className = 't-column';
    debitCol.innerHTML = `
      <div class="column-label">Debit</div>
      <div class="debit-entries"></div>
      <div class="t-account-buttons">
        <button onclick="addDebitLine(this)">➕ Add Debit</button>
      </div>
    `;
    tBody.appendChild(debitCol);
  
    const creditCol = document.createElement('div');
    creditCol.className = 't-column';
    creditCol.innerHTML = `
      <div class="column-label">Credit</div>
      <div class="credit-entries"></div>
      <div class="t-account-buttons">
        <button onclick="addCreditLine(this)">➕ Add Credit</button>
      </div>
    `;
    tBody.appendChild(creditCol);
  
    tAccount.appendChild(tBody);
    return tAccount;
  }
  
  /**
   * Adds a new debit line (input box) to the T-Account's debit column.
   * @param {HTMLElement} buttonEl - The "➕ Add Debit" button within a T-Account.
   */
  function addDebitLine(buttonEl) {
    const debitContainer = buttonEl.parentElement.parentElement.querySelector('.debit-entries');
    const line = document.createElement('div');
    line.className = 't-line';
    line.innerHTML = `<input type="number" class="debitLineValue" placeholder="Amount ($)">`;
    debitContainer.appendChild(line);
  }
  
  /**
   * Adds a new credit line (input box) to the T-Account's credit column.
   * @param {HTMLElement} buttonEl - The "➕ Add Credit" button within a T-Account.
   */
  function addCreditLine(buttonEl) {
    const creditContainer = buttonEl.parentElement.parentElement.querySelector('.credit-entries');
    const line = document.createElement('div');
    line.className = 't-line';
    line.innerHTML = `<input type="number" class="creditLineValue" placeholder="Amount ($)">`;
    creditContainer.appendChild(line);
  }
  
  /**
   * Checks if the T-Accounts match the cumulative net of all transactions up to the current one.
   */
  function checkTAccounts() {
    const tAccountResult = document.getElementById('tAccountResult');
    tAccountResult.style.display = 'block';
    tAccountResult.className = '';
    tAccountResult.innerHTML = '';
  
    let userNet = {};
    const allTAccounts = document.querySelectorAll('.t-account');
  
    allTAccounts.forEach(tAcc => {
      const hidden = tAcc.querySelector('.title-selectValue');
      const accountName = (hidden.value||'').trim().toLowerCase();
      if (!accountName) return;
  
      let sumDebit = 0, sumCredit = 0;
      const debitEls  = tAcc.querySelectorAll('.debitLineValue');
      const creditEls = tAcc.querySelectorAll('.creditLineValue');
  
      debitEls.forEach(el => {
        sumDebit += parseFloat(el.value) || 0;
      });
      creditEls.forEach(el => {
        sumCredit += parseFloat(el.value) || 0;
      });
  
      if (!userNet[accountName]) userNet[accountName] = 0;
      userNet[accountName] += sumDebit;
      userNet[accountName] -= sumCredit;
    });
  
    const expected = getCumulativeSolutionUpTo(currentTransactionIndex);
    let allMatch = true;
  
    // Check if every account in expected matches userNet
    for(let acc in expected) {
      const exVal   = expected[acc];
      const userVal = userNet[acc] || 0;
      if(userVal !== exVal){
        allMatch = false;
        break;
      }
    }
  
    // Check if user has any extra accounts or mismatched amounts
    for(let acc in userNet) {
      const userVal = userNet[acc];
      const exVal   = expected[acc] || 0;
      if(userVal !== exVal){
        allMatch = false;
        break;
      }
    }
  
    if(!allMatch){
      tAccountResult.classList.add('incorrect-block');
      tAccountResult.innerHTML=`
        <h3>❌ T-Accounts do not match up to Transaction #${currentTransactionIndex + 1}.</h3>
        <p>Double-check your debits and credits for each account.</p>
      `;
      isTAccountCorrect = false;
      checkAllCorrectness();
      return;
    }
  
    tAccountResult.classList.add('correct-block');
    tAccountResult.innerHTML=`
      <h3>✅ Correct!</h3>
      <p>Your T-accounts align perfectly with all transactions up to <strong>Transaction ${currentTransactionIndex + 1}</strong>.</p>
      <p>${scenarios[currentTransactionIndex].explanation}</p>
    `;
    isTAccountCorrect = true;
    startTAccountsHTML = document.getElementById('tAccountContainer').innerHTML;
  
    checkAllCorrectness();
  }
  
  /* =========================
     TRIAL BALANCE FUNCTIONS
     ========================= */
  
  /**
   * Renders the initial Trial Balance rows (if any).
   * Currently, it just clears existing rows and sets up a fresh table body.
   */
  function renderTrialBalanceRows() {
    document.getElementById('trialBalanceRows').innerHTML = '';
  }
  
  /**
   * Adds a new row to the Trial Balance table with a dropright for account selection and debit/credit inputs.
   */
  function addTrialBalanceRow() {
    const tbody = document.getElementById('trialBalanceRows');
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${createAccountDroprightHTML("tbAccountName")}</td>
      <td><input type="number" class="tbDebit" placeholder="Debit ($)"></td>
      <td><input type="number" class="tbCredit" placeholder="Credit ($)"></td>
    `;
    tbody.appendChild(row);
  
    const debitInput  = row.querySelector('.tbDebit');
    const creditInput = row.querySelector('.tbCredit');
    debitInput.addEventListener('input', updateTrialBalanceTotals);
    creditInput.addEventListener('input', updateTrialBalanceTotals);
  
    // Hook up dropright selection
    setTimeout(() => {
      const menuItems = row.querySelectorAll('.menu-item');
      const btn       = row.querySelector('.dropbtn');
      const hidden    = row.querySelector('.tbAccountNameValue');
      const content   = row.querySelector('.dropright-content');
  
      menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
          e.stopPropagation();
          const val = item.getAttribute('data-value');
          hidden.value = val;
          btn.textContent = val;
          content.style.display = 'none'; 
  
          trialBalanceUsedAccounts.add(val);
        });
      });
    }, 10);
  }
  
  /**
   * Checks if the Trial Balance rows correctly reflect all transactions up to the current one.
   */
  function checkTrialBalance() {
    const trialBalanceResult = document.getElementById('trialBalanceResult');
    trialBalanceResult.style.display='block';
    trialBalanceResult.className='';
    trialBalanceResult.innerHTML='';
  
    const rows = document.querySelectorAll('#trialBalanceRows tr');
    let displayedDebitTotal = 0;
    let displayedCreditTotal = 0;
  
    let userNet = {};
  
    rows.forEach(r => {
      const hiddenAcc = r.querySelector('.tbAccountNameValue');
      if(!hiddenAcc) return;
      const acc = (hiddenAcc.value||'').toLowerCase();
      if(!acc) return;
  
      const debEl  = r.querySelector('.tbDebit');
      const credEl = r.querySelector('.tbCredit');
      const deb  = parseFloat(debEl.value)||0;
      const cred = parseFloat(credEl.value)||0;
  
      displayedDebitTotal += deb;
      displayedCreditTotal += cred;
  
      if(!userNet[acc]) userNet[acc] = 0;
      userNet[acc] += deb;
      userNet[acc] -= cred;
    });
  
    // Update the total fields in the UI
    document.getElementById('tbTotalDebit').textContent  = displayedDebitTotal.toFixed(2);
    document.getElementById('tbTotalCredit').textContent = displayedCreditTotal.toFixed(2);
  
    // Check if TB is balanced
    if(displayedDebitTotal !== displayedCreditTotal) {
      trialBalanceResult.classList.add('incorrect-block');
      trialBalanceResult.innerHTML=`
        <h3>❌ Trial Balance does not balance!</h3>
        <p>Debits ($${displayedDebitTotal.toFixed(2)}) != Credits ($${displayedCreditTotal.toFixed(2)}).</p>
      `;
      isTrialBalanceCorrect = false;
      checkAllCorrectness();
      return;
    }
  
    // Compare user Net values with expected from all transactions
    const expected = getCumulativeSolutionUpTo(currentTransactionIndex);
    let allMatch = true;
  
    for(let acc in expected) {
      const exVal   = expected[acc];
      const userVal = userNet[acc] || 0;
      if(userVal !== exVal){
        allMatch=false;
        break;
      }
    }
    for(let acc in userNet) {
      const userVal = userNet[acc];
      const exVal   = expected[acc] || 0;
      if(userVal !== exVal){
        allMatch=false;
        break;
      }
    }
  
    if(!allMatch){
      trialBalanceResult.classList.add('incorrect-block');
      trialBalanceResult.innerHTML=`
        <h3>❌ Not quite right.</h3>
        <p>Your Trial Balance doesn't align with the transactions so far.</p>
      `;
      isTrialBalanceCorrect = false;
      checkAllCorrectness();
      return;
    }
  
    trialBalanceResult.classList.add('correct-block');
    trialBalanceResult.innerHTML=`
      <h3>✅ Correct!</h3>
      <p>Your Trial Balance matches all transactions up to <strong>Transaction ${currentTransactionIndex + 1}</strong>.</p>
      <p>${scenarios[currentTransactionIndex].explanation}</p>
    `;
    isTrialBalanceCorrect = true;
    startTBHTML = document.getElementById('trialBalanceRows').innerHTML;
    checkAllCorrectness();
  }
  
  /**
   * Retrieves the cumulative net amounts for each account across all transactions up to a given index.
   * @param {number} txIndex - The transaction index (0-based).
   * @returns {Object} A map of accountName => netAmount.
   */
  function getCumulativeSolutionUpTo(txIndex) {
    let netObj = {};
    for(let i=0; i<=txIndex; i++){
      let sol = scenarios[i].solution;
      sol.forEach(line => {
        const acc = line.account.toLowerCase();
        if(!netObj[acc]) netObj[acc] = 0;
        if(line.debit > 0){
          netObj[acc] += line.debit;
        } else {
          netObj[acc] -= line.credit;
        }
      });
    }
    return netObj;
  }
  
  /**
   * Locks (makes read-only) all existing T-Account input fields so the user
   * cannot modify previous transactions once they've completed them.
   */
  function lockPreviousTAccountEntries() {
    const allDebitInputs  = document.querySelectorAll('.debitLineValue');
    const allCreditInputs = document.querySelectorAll('.creditLineValue');
    allDebitInputs.forEach(el => { el.readOnly = true; });
    allCreditInputs.forEach(el => { el.readOnly = true; });
  }
  
  /**
   * Clears the T-Account entries for the current transaction, leaving locked lines intact.
   */
  function redoTAccounts() {
    const allTAccounts = document.querySelectorAll('.t-account');
    let isAccountRemoved = false;

    allTAccounts.forEach(tAcc => {
        const inputs = tAcc.querySelectorAll('.debitLineValue, .creditLineValue');
        let hasReadOnly = false;

        inputs.forEach(el => {
            if (el.readOnly) {
                hasReadOnly = true;
            }
        });

        // Remove the T-Account completely if it has no read-only lines.
        if (!hasReadOnly) {
            tAccountUsedAccounts.delete(tAcc.querySelector('.title-selectValue').value);
            tAcc.remove();
            isAccountRemoved = true;
        } else {
            // Otherwise, remove only the editable lines.
            const debitEls = tAcc.querySelectorAll('.debitLineValue');
            const creditEls = tAcc.querySelectorAll('.creditLineValue');
            debitEls.forEach(el => {
                if (!el.readOnly) {
                    el.parentElement.remove();
                }
            });
            creditEls.forEach(el => {
                if (!el.readOnly) {
                    el.parentElement.remove();
                }
            });
        }
    });

    // If an account was removed, add a new T-Account dropdown
    if (isAccountRemoved) {
        addTAccount();
    }
}

  
  /**
   * Dynamically updates the Trial Balance debit/credit totals as the user types.
   */
  function updateTrialBalanceTotals() {
    const rows = document.querySelectorAll('#trialBalanceRows tr');
    let totalDebits = 0;
    let totalCredits = 0;
  
    rows.forEach(r => {
      const debEl  = r.querySelector('.tbDebit');
      const credEl = r.querySelector('.tbCredit');
      if (!debEl || !credEl) return;
  
      const deb  = parseFloat(debEl.value)||0;
      const cred = parseFloat(credEl.value)||0;
  
      totalDebits += deb;
      totalCredits += cred;
    });
  
    document.getElementById('tbTotalDebit').textContent  = totalDebits.toFixed(2);
    document.getElementById('tbTotalCredit').textContent = totalCredits.toFixed(2);
  }
  